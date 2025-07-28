import {z} from "zod"



 export const productSchema=z.object({
    name:z.string().min(8),
    quantity:z.nonnegative(),
     cost_price:z.nonnegative(),
     selling_price:z.nonnegative()
 })
