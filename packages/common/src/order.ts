import {z} from "zod"



export const cartSchema=z.object({
    quantity:z.nonnegative
})

