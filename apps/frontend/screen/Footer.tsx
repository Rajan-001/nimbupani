"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export const Footer = () => {
  const footerRef=useRef(null)
  
  const {scrollYProgress}=useScroll({
    target:footerRef,
    offset:["start end","end start"]
  })

  const offsetfooter=useTransform(scrollYProgress,[0,1],[-130,-600])
  
  return (
           <div className='h-[120vh] mt-12 '>
            <div ref={footerRef} className='w-[calc(100vw-200)] overflow-hidden h-screen relative rounded-3xl mx-12  bg-red-200'>
       <div className='grid grid-cols-2  pt-24 w-full h-104 px-12'>
          <div className='w-full h-full flex px-12 leading-12 justify-center  text-center text-3xl items-center'>
            <div className='inline'>
            <Image className='inline h-8 w-8 mr-4 ' src={"/svg/drip.svg"} width={40} height={40} alt="Charlie"/>  
                  
            Enjoy the pure, organic taste of Charlie’s – no added sugars, no nonsense, just refreshment in a fully recyclable can
          </div>
          </div>

          <div className='w-full h-full ' >
           <div className='h-full w-full object-contain bg-blue-950 origin-fit'  style={{ 
             WebkitMaskImage: 'url("/svg/letsdrinkharmless.svg")',
            maskImage: 'url("/svg/letsdrinkharmless.svg")',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskPosition: 'center',
            maskPosition: 'center', 
                  }} 
            ></div>      
          </div>
       </div>

    <motion.div style={{x:offsetfooter}} className='text-[100px] whitespace-nowrap  text-blue-950 text-center uppercase absolute  h-60 w-[140vw]  bottom-8 flex justify-center items-center'>
  Drink Charlie <Image className='h-60  w-56   inline' width={40} height={30} alt='Earth' src={"/svg/co2-neutral.svg"}/>  FOLLOW US
    </motion.div>

    </div>
    </div>
   
  )
}