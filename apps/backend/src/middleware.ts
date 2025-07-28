import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/common"

export function middleware(req:Request,res:Response,next:NextFunction){
  const token=req.headers["authorization"]??"" 
  const decoded=jwt.verify(token,JWT_SECRET!)
  if(decoded){
    //@ts-ignore
    req.id=decoded.id
    next()
  }else{
    res.status(403).json({
       Error:"unauthorized"
    })
  }
}