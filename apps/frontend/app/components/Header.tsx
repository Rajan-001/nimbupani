import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const Header = ({text}:{text:string}) => {
  return (

     <div className='[clip-path:polygon(0.5%_0,100%_0,98%_100%,0%_100%)] w-full h-92 bg-sky-200 flex overflow-hidden relative'>
        <Image unoptimized className='w-full h-full object-cover ' width={30} height={40} alt={'Faq'} src={"/images/HomePageMask.avif"} />
      <motion.div initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.3}} className=" uppercase absolute    bottom-6 w-full text-center flex justify-center items-center font-extrabold h-28 text-sky-900 text-[140px]">{text}</motion.div>
      </div>      
  

  
  )
}