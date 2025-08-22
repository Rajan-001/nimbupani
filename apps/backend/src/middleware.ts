import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/common"

export function middleware(req:Request,res:Response,next:NextFunction){
  const token = req.cookies.token;
  console.log("middleware",token)
  const decoded=jwt.verify(token,JWT_SECRET!)
  if(decoded){
    //@ts-ignore
    req.id=decoded.userId
    next()
  }else{
    res.status(403).json({
       Error:"unauthorized"
    })
  }
}