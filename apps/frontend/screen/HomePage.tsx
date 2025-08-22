"use client"
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../app/hook'
import { selectCount, increment } from '../redux/slices/cartSlice'
import { Button } from '../app/components/Button'
import { colorVariants } from '../lib/variants'



export const HomePage = () => {
const x = useMotionValue(750);
  const y = useMotionValue(500);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = useAppSelector(selectCount)
const dispatch=useDispatch()

const smoothX = useSpring(x, { stiffness: 100, damping: 20 });
const smoothY = useSpring(y, { stiffness: 100, damping: 20 });
  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - 32; // 48 is half of 96 (div size)
    const mouseY = e.clientY - rect.top - 32;
       
    x.set(mouseX);
    y.set(mouseY);
    
  }
 

  return (
    <div   ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={()=>{x.set(50);y.set(50);}} className='w-screen h-screen  relative  justify-center items-center overflow-hidden '>
            
           
          <motion.div  onClick={(e)=>dispatch(increment()) }  style={{x:smoothX,y:smoothY}} className='w-28 cursor-pointer h-28 z-10  rounded-full bg-yellow-200 text-3xl text-blue-950  uppercase  absolute border-black p-4 border-2  flex justify-center items-center  '>
          <motion.p>Tap</motion.p>
       </motion.div>
      

       <div  className=' overflow-hidden z-2 h-[calc(100vh-24px)] rounded-br-[94px]  rounded-4xl [clip-path:polygon(0.5%_0,100%_0,95%_100%,0%_100%)]   w-[calc(100vw-24px)] relative    '>
     <motion.div style={{backgroundColor:colorVariants[count].color}} className='w-full h-full '>
   
     <AnimatePresence>
      <motion.div
        key={count}
        initial={{ scale: 0.5, opacity: 0.3 }}
        animate={{ scale: 2, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: "backInOut" }}
        style={{
          backgroundColor: colorVariants[count].color,
          position: "absolute",
          top: "0%",
          left: "0%",
          width: "100vw",
          height: "100vh",
          transform: "translate(-50%, -50%)",
          borderRadius: "200%",
          zIndex: 0,
          pointerEvents: "none" // prevents it from blocking interactions
        }}
      />
    </AnimatePresence>


      <div  className='z-1 w-full h-full p-4    overflow-hidden  bg-white ' 
      style={{
            WebkitMaskImage: 'url("/images/HomePageMask.avif")',
            maskImage: 'url("/images/HomePageMask.avif")',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
            WebkitMaskPosition: "50% 1005",
           
            }}
      
      >

      </div>
  
      <div className='z-2  w-full  top-2 flex justify-between items-center h-24'>
        <div>
           <Image width={20} height={30} className="h-full pb-6 w-6" src="/svg/Instagram.svg" alt="Logo"/>
      
        </div>
        <motion.div>
          <Image width={20} height={30} className="h-full w-42" src="/svg/Charlie-logo.svg" alt="Logo"/>
        </motion.div>
        <div>
          <Button buttonText="Order" />
        </div>
      </div>
       <div className='z-1 absolute flex top-32 left-1/4 h-fit w-fit  '>
          <Image src="/svg/Bring-On-Cheers.svg" className=' h-[60vh] w-[50vw]' width={20} height={30} alt="4rew" />
         </div>
  <div className='absolute z-2 flex top-0 left-1/7 h-fit w-fit bg-transparent '>
       <video autoPlay muted loop src={`${colorVariants[count].video}`} className='h-[95vh] w-[70vw] bg-transparent '/>
           </div>
   
       
   
       </motion.div>
      
      </div>

    </div>
  )
}