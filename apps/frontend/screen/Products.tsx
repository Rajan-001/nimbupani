"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { colorVariants } from './HomePage';


export const Products = () => {

  const [Open,SetOpenProduct]=useState(null)

  return (
    <div className='w-[100vw]  h-[180vh] relative'>

  
         <AnimatePresence mode="wait">
              {
                Open&&
                <motion.div className='  flex justify-center items-center bg-black/30 backdrop-blur-sm fixed inset-0 z-50'>
                <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0.8}} transition={{duration:0.3}} className='w-[calc(100vw-300px)]  relative bg-white p-2 rounded-2xl'>
                   <Image unoptimized className='h-full w-full inline' src={colorVariants[Open].description} width={30} height={40} alt='product-description'/>
                   <div className='w-16 h-16 flex items-center rounded-full absolute top-0 -right-20 cursor-pointer p-4 bg-blue-950 text-white' onClick={()=>SetOpenProduct(null)}>
                    <IoMdClose className='h-full w-full text-white ' />
                   </div>
                </motion.div>
                     </motion.div>
              }
        </AnimatePresence>
           
      <div className='grid grid-cols-3 overflow-hidden border-2 h-full w-full relative justify-center items-center gap-x-8 gap-y-6 px-6 py-4'>
        {colorVariants.map((variant, i) => (
          <div key={i}
          className='flex relative bg-amber-400 w-full h-full'
          >
           
          <div
            key={i}
            className='bg-amber-400 group relative  w-full h-full  flex  border-2 overflow-hidden'
             style={{ backgroundColor: variant.color
             }}
              >
                <div className='z-12 w-full h-2/3 transition-all duration-300 group-hover:scale-110 absolute bottom-0 bg-white' 
                style={{ 
                  WebkitMaskImage: 'url("/images/HomePageMask.avif")',
                maskImage: 'url("/images/HomePageMask.avif")',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskSize: 'cover',
                WebkitMaskPosition: 'center'
                }}>
            </div>
            <motion.div whileHover={{scale:[0.8,0.9,1]}} onClick={()=>{SetOpenProduct(i)}} className='w-12 h-12  z-6 hover:bg-blue-950 hover:text-white rounded-full bg-white flex justify-center items-center absolute top-3 right-4 text-2xl font-bold cursor-pointer'>i</motion.div>
        
            <Image
              unoptimized
              width={20}
              height={40}
              src={variant.image}
              alt={variant.name}
              className='w-full top-18 absolute group-hover:rotate-8 z-3 group-hover:scale-110 duration-300 h-2/3 object-contain'
            />
              <Image
              unoptimized
              width={20}
              height={40}
              src={`/svg/grid-shapes/shape-${i+1}.avif`}
              alt={variant.name}
              className='w-full absolute group-hover:scale-110 duration-300  h-full object-cover'
            />
             <div className='text-3xl  text-blue-950 z-30 text-center absolute w-full bottom-18 '>
                {variant.name}
             </div>
             <div className='text-xl absolute w-full text-center bottom-8 text-white'>
              0 Sugar
             </div>

          </div>

          </div>
        ))}
      </div>
    </div>
  )
}

