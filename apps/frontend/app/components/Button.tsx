"use client"
import { AnimatePresence, hover, motion } from 'framer-motion'
import React, { useState } from 'react'



export const Button = ({buttonText}:{buttonText:string}) => {
 
    return (
   <motion.div initial="intial" whileHover="hover" className="cursor-pointer w-32 mr-4 h-16 overflow-hidden relative uppercase text-center text-[18px] bg-sky-50">
  <motion.div
    variants={{
          initial: { y: "0%" },
          hover: { y: "-100%" },
        }}
        transition={{ ease: "linear", duration: 0.3 }}
    className="absolute top-0 left-0 w-full h-full flex justify-center items-center px-2 py-1"
  >
    {buttonText}
  </motion.div>
  <motion.div
      variants={{
        intial:{y:"100%"},
        hover:{y:"0%"}
      }}
       transition={{ ease: "linear", duration: 0.3 }}
    className="absolute  top-0 left-0  w-full h-full flex justify-center items-center px-2 py-1"
  >
    {buttonText}
  </motion.div>
</motion.div>

    

  )
}