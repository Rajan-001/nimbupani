

import { safeParse } from "zod"
import jwt from "jsonwebtoken"
import express from "express";
import { Request,Response } from "express";
import Razorpay from "razorpay";
const crypto = require('crypto');
import {prisma} from "@repo/db/client";
import { middleware } from "./middleware.js";
import {userSchema} from "@repo/common/user";
import { rateLimitMiddleware } from "./ratelimiter-middleware.js";
import cors from "cors"


const app=express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000", // allow frontend URL
  methods: ["GET", "POST"],
  credentials: true
}));





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
         const token=jwt.sign({userId:response.id},process.env.JWT_SECRET!)
         res.json({
            token
         })

    }
    catch(err){
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
        const response=prisma.cart.findFirst({
             //@ts-ignore
            userId:req.id
        })
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

    try{
        const cart=await prisma.cart.upsert({
             //@ts-ignore
           where:{ userId:req.id},
           create:{

             //@ts-ignore
               userId:req.id,
           },
           update:{}
        })
       


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
            price: req.body.product.selling_price,
            }
        })
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
    
    try{
        const cart=await prisma.cart.upsert({
             //@ts-ignore
           where:{ userId:req.id},
           create:{
             //@ts-ignore
               userId:req.id,
           },update:{}
        })
       
  if(!cart){
            res.status(411).json({
                Err:"Not able to get the cart"
            })
        }

        const cartItem=await prisma.cartItem.delete({
            where:{ cartId_productId: {
                cartId: cart.id,
          productId: req.body.productId,
            } }

        })
        return res.status(201).json({
            message:"Product removed from cart",
            cartItem
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
  try {
    // 1️⃣ Get the logged-in user ID from middleware
    //@ts-ignore
    const userId = req.id;

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

    // 3️⃣ Calculate total price
    const totalAmount = cart.cartItem.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);


   
  const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });
      
    const options = {
      amount: totalAmount * 100, // amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    const {currency,id,status}=order
    const receipt = order.receipt ?? "default-receipt";
    
  
  const orderData=  await prisma.orders.create({
      data: {
        userId,
        totalAmount,
        currency,
        order_Id:id,
        receipt,
        status: "created",
        paymentMethod: req.body.paymentMethod , 
        orderItems: {
          create: cart.cartItem.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
     
    });

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



app.post("/verify-payment", async (req, res) => {
  try {
const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
   console.log(razorpay_order_id)
    // 🔐 Create the signature to compare with Razorpay’s
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    console.log("Generated Signature:", expectedSignature);
    console.log("Received Signature:", razorpay_signature);

    if (expectedSignature === razorpay_signature) {
      console.log("✅ Payment Verified");

      const payment = await prisma.payments.create({
        data: {
          orderId: orderId, // coming from frontend
          razorpay_order_id: razorpay_order_id,
          razorpay_payment_id: razorpay_payment_id,
          razorpay_signature: razorpay_signature,
          status: "success", // from your enum Status (SUCCESS, REFUNDED, FAILED)
          paymentDate:new Date(),
          order: {
      connect: { order_Id: razorpay_order_id }
    }
        },
      });

      // 👉 Here you can update DB to mark the order as PAID
      return res.json({ success: true });
    } else {
      console.log("❌ Signature mismatch! Possible fraud");
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error("❌ Verification Error:", error);
    return res.status(500).json({ success: false});
  }
});




app.listen(8001, () => console.log("Server running on http://localhost:8001"));

