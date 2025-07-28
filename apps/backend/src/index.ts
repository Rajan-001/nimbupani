

import { safeParse } from "zod"
import jwt from "jsonwebtoken"
import express from "express";
import { Request,Response } from "express";


import {prisma} from "@repo/db/client";
import { middleware } from "./middleware.js";
import {userSchema} from "@repo/common/user";
import { rateLimitMiddleware } from "./ratelimiter-middleware.js";



const app=express()
app.use(express.json())




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
        return res.status(201).json({
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

app.listen(8001, () => console.log("Server running on http://localhost:8001"));

