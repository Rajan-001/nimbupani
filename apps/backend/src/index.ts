

import { includes, safeParse } from "zod"
import jwt from "jsonwebtoken"
import express from "express";
import { Request,Response } from "express";
import Razorpay from "razorpay";
const crypto = require('crypto');
import {prisma} from "@repo/db/client";
import { middleware } from "./middleware.js";
import {userSchema} from "@repo/common/user";
import { rateLimitMiddleware } from "./ratelimiter-middleware.js";
import {JWT_SECRET, RAZORPAY_ID, RAZORPAY_KEY_SECRET} from "@repo/backend-common/common"
import cors from "cors"

import cookieParser from "cookie-parser";
import { connect } from "http2";


const app=express()
app.use(express.json())
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000"

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === FRONTEND_URL) {
      callback(null, true);
    } else {
      console.warn("Blocked CORS request from origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser())



app.post("/signup",rateLimitMiddleware("/signup",60,5), async(req:Request,res:Response)=>{
    const parsedData=userSchema.safeParse(req.body)
    console.log(parsedData)
    if(!parsedData.success)
    {
        return
    }
    try{
         const user=await prisma.userInfo.create({
            data:{
               name:parsedData.data.name,
               password:parsedData.data.password,
               createdAt: new Date(),
            }
         })
        
         res.status(200).json({
            userId:user.id
         })
        
    }
    catch(err){
    return res.status(500).json({error:err})
    }
})

app.post("/signin",async (req:Request,res:Response)=>{
    const parsedData=userSchema.safeParse(req.body)
    if(!parsedData.success){
        return
    }
    try{
        
         const response=await prisma.userInfo.findFirst({
            where:{
                name:parsedData.data.name,
                password:parsedData.data.password
            }
         })
         
          //@ts-ignore
         const token=jwt.sign({userId:response.id},JWT_SECRET!)
       res.cookie("token", token, {
            httpOnly: true,   // ✅ cannot be accessed via JS
            secure: false,    // ✅ set to true only if you have HTTPS (you can change later)
            sameSite: "lax" // ✅ prevents CSRF
            });
            
      if(token)
      {
      res.status(200).json({
        message:"able to do signIn"
      })
      }else{
        res.status(407).json({
            message:"Not able to create token"
        })
      }
    }
    catch(err){
        console.log(err)
        res.status(404).json({
            Error:err
        })
    }
})

app.put("update-name",middleware,async (req:Request,res:Response)=>{
    const parsedData=userSchema.safeParse(req.body)
    if(!parsedData.success){
        return
    }
    else{
        try{
        const response=await prisma.userInfo.update({
            where:{
                //@ts-ignore
               id:req.id
            },
            data:{
                name:parsedData.data.name,
                upadetAt:new Date()
            }
        })
        if(response){
            res.status(201).json({
                message:"Your name Updated"
            })
        }
        else{
            res.status(403).json({
                Error:"Unauthorized accesss"
            })
        }}
        catch(e){
            res.status(503).json({
                err:e
            })
        }
    }
})

app.put("update-password",middleware,async (req:Request,res:Response)=>{
    const parsedData=userSchema.safeParse(req.body)
    if(!parsedData.success){
        return
    }
    else{
        try{
        const response=await prisma.userInfo.update({
            where:{
                 //@ts-ignore
               id:req.id
            },
            data:{
                name:parsedData.data.password,
                upadetAt:new Date()
            }
        })
        if(response){
            res.status(201).json({
                message:"Your name Updated"
            })
        }
        else{
            res.status(403).json({
                Error:"Unauthorized accesss"
            })
        }}
        catch(e){
            res.status(503).json({
                err:e
            })
        }
    }
})



// Order API

app.post("/get-order",middleware,async (req:Request,res:Response)=>{

    try{
    const response=await prisma.orders.findFirst({
         //@ts-ignore
        userId:req.id
    })
    if(response){
        res.status(201).json({
            response
        })
    }
    else{
        res.status(403).json({
            message:"No result found"
        })
    }
   }
   catch(err){
    res.status(503).json({
        err
    })
   }

})

//Cart API


app.get("/get-cart",middleware,async(req:Request,res:Response)=>{
    
    try{
        const response=await prisma.cart.findUnique({
           where:{
            //@ts-ignore
            userId:req.id
           },
           include:{
            cartItem:{
                include:{
                    product:{
                        select:{
                             name:true,
                             selling_price:true,
                             image_url:true
                        }
                    }
                }
            },
            Order:true
           }
        })
        console.log(response)
        if(!response){
            res.status(411).json({
                Err:"Not able to get the cart"
            })
        }
        else{
            res.status(201).json({
                response
            })
        }

    }catch(err){
        res.status(500).json({
            err
        })
    }
})

app.post("/add-cart",middleware,async(req:Request,res:Response)=>{
    //@ts-ignore
  
    try{
        const cart=await prisma.cart.upsert({
            //@ts-ignore
            where: { userId: req.id! },
            create: {
                //@ts-ignore
                userId: req.id!,
            },
            update: {

            }
        })
       
        console.log("cart",cart)
     console.log("productId",req.body.productId)
     console.log("quantity",req.body.quantity)
   console.log("selling price",req.body.selling_price)


        const cartItem=await prisma.cartItem.upsert({
            where:{
                cartId_productId:{
                cartId: cart.id,
          productId: req.body.productId,}
            },
            update:{
                
                quantity:req.body.quantity
            },
            create:{
                cart: { connect: { id: cart.id }},
                product: { connect: { id: req.body.productId } },
                quantity:req.body.quantity,
            price: req.body.selling_price,
            }
        })
        console.log("cart-Item",cartItem)
         res.status(201).json({
            message:"Items Added to cart",
            cartItem
        })

        if(!cart){
            res.status(411).json({
                Err:"Not able to get the cart"
            })
        }
        else{
            res.status(201).json({
                cart
            })
        }

    }catch(err){
        res.status(500).json({
            err
        })
    }
})

app.delete("/remove-cart",middleware,async(req:Request,res:Response)=>{
    const ProductId=req.body.productId
    console.log(ProductId)
    try{
        const cart=await prisma.cart.update({
             //@ts-ignore
           where:{ userId:req.id},
           //@ts-ignore
           data:{
            cartItem:{
                deleteMany:{
                    productId:ProductId
                }
            }
           }
           
        })
       
  if(!cart){
            res.status(411).json({
                Err:"Not able to delete from cart the cart"
            })
        }
     
        return res.status(201).json({
           cart
            
        })
    }catch(err){
        res.status(500).json({
            err
        })
    }
})


//Porduct API

app.get("/get-all-product-detail",async (req:Request,res:Response)=>{
    
    try{
    const products= await prisma.product.findMany()
    console.log(products)
    res.status(201).json(products)
    }
    catch(err){
        res.status(403).json({
            err
        })
    }

})

app.put("/update-product-detail",middleware,async (req:Request,res:Response)=>{
    try{
          const { productId, name, selling_price, quantity, description } = req.body;
      const user= await prisma.userInfo.findFirst({
            //@ts-ignore
        where:{id:req.id, role:"ADMIN"} 
          
      }) 
      if(!user){
        res.status(403).json({
            message:"Only admin can ablle to update"
        })
      }
      const updateProduct= prisma.product.update({
        where:{
            id:productId
        },
        data:{ name:name, selling_price:selling_price,quantity:quantity,description:description }
      })
      res.status(201).json({
       updateProduct
      })
    }
    catch(err){
           res.status(503).json({
            err
           })
    }
})


app.get("/get-product-detail",async (req:Request,res:Response)=>{
    try{
         const {productId}=req.body
         const product=await prisma.product.findUnique({
          where: {
    id: productId, // Make sure productId is a number
  },
         })
         res.status(200).json({
            product
         })
    }
    catch(err){
           res.status(503).json({
            err
           })
    }
})


// app.use(rateLimiter({ windowInSeconds: 60, maxRequests: 10 }));
app.post("/checkout", middleware, async (req: Request, res: Response) => {
    console.log("i am in checkout")
  try {
    // 1️⃣ Get the logged-in user ID from middleware
    //@ts-ignore
    const userId = req.id!;

    // 2️⃣ Find the cart for the user (with cart items + product details)
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { 
        cartItem: { include: { product: true } } 
      }
    });

    if (!cart || cart.cartItem.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    console.log("cart",cart)

    // 3️⃣ Calculate total price
    const totalAmount = cart.cartItem.reduce((sum:number, item:any) => {
      return sum + item.quantity * item.price;
    }, 0);


    console.log("Total amount",totalAmount)

  const razorpay = new Razorpay({
        key_id: RAZORPAY_ID!,
        key_secret: RAZORPAY_KEY_SECRET!,
      });
      
    const options = {
      amount: totalAmount * 100, // amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
   console.log("options",options)
    const order = await razorpay.orders.create(options);
    const {currency,id,status}=order
    const recepient = order.receipt ?? "default-receipt";
    
  
  const orderData=  await prisma.orders.create({
      data: {
        user: { connect: { id: userId } },    
        //@ts-ignore
      cart: { connect: { id: cart.id } },  
        totalAmount,
        currency,
        order_id:id,
        recepient,
        
        //@ts-ignore
        orderItem: {
          create: cart.cartItem.map((item:any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
    
        },
      },
     
    });

    console.log("order data item",orderData)

    // 5️⃣ Optional: Clear the cart after order creation
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return res.status(201).json({
      orderData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.post("/verify-payment",middleware, async (req, res) => {
  try {
const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
   console.log(razorpay_order_id)
    // 🔐 Create the signature to compare with Razorpay’s
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    console.log("Generated Signature:", expectedSignature);
    console.log("Received Signature:", razorpay_signature);
    //@ts-ignore
   console.log("request id",req.id)
    if (expectedSignature === razorpay_signature) {
      console.log("✅ Payment Verified");

      const payment = await prisma.payments.create({
      
        data: {
              //@ts-ignore
          orderId, // coming from frontend
          Product_Cart_Id:req.body.cartId,
          razorpay_order_id: razorpay_order_id,
          razorpay_payment_id: razorpay_payment_id,
          razorpay_signature: razorpay_signature,
        
            //@ts-ignore
          Payment_Status: "success", // from your enum Status (SUCCESS, REFUNDED, FAILED)
          paymentDate:new Date(),
          orders: {
      connect: { order_id:razorpay_order_id }
    },
      user:{
        connect:{
        //@ts-ignore
          id:req.id,
        }
      }
        },
      });
      console.log(payment)

      // 👉 Here you can update DB to mark the order as PAID
      return res.status(200).json({ success: true });
    } else {
      console.log("❌ Signature mismatch! Possible fraud");
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error("❌ Verification Error:", error);
    return res.status(500).json({ success: false});
  }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.listen(8001, () => console.log("Server running on http://localhost:8001"));

