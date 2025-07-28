"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { colorVariants } from './HomePage';




export const Cart = () => {
 const [flavour,setFlavour]=useState(1)
 const[quantity,setQuantity]=useState(0)

  return (
    <div className='w-screen h-screen relative bg-yellow-50'>
       <div className="w-[93vw] h-4 m-4 absolute top-2  flex justify-center items-center ">
        <svg className="block w-full h-full " viewBox="0 0 500 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
            <path
                id="wave"
                d="
                M0 20
                Q3.125 0 6.25 20 T12.5 20 T18.75 20 T25 20 T31.25 20 T37.5 20 T43.75 20 T50 20
                T56.25 20 T62.5 20 T68.75 20 T75 20 T81.25 20 T87.5 20 T93.75 20 T100 20
                T106.25 20 T112.5 20 T118.75 20 T125 20 T131.25 20 T137.5 20 T143.75 20 T150 20
                T156.25 20 T162.5 20 T168.75 20 T175 20 T181.25 20 T187.5 20 T193.75 20 T200 20
                T206.25 20 T212.5 20 T218.75 20 T225 20 T231.25 20 T237.5 20 T243.75 20 T250 20
                T256.25 20 T262.5 20 T268.75 20 T275 20 T281.25 20 T287.5 20 T293.75 20 T300 20
                T306.25 20 T312.5 20 T318.75 20 T325 20 T331.25 20 T337.5 20 T343.75 20 T350 20
                T356.25 20 T362.5 20 T368.75 20 T375 20 T381.25 20 T387.5 20 T393.75 20 T400 20
                T406.25 20 T412.5 20 T418.75 20 T425 20 T431.25 20 T437.5 20 T443.75 20 T450 20
                T456.25 20 T462.5 20 T468.75 20 T475 20 T481.25 20 T487.5 20 T493.75 20 T500 20
                "
                stroke="black"
                fill="none"
                strokeWidth="2"
            />
            </defs>
            <use href="#wave" y="0" />
        </svg>
        </div> 
      <div className="w-[58vw] h-4 m-4 absolute  left-2 origin-top-left rotate-90 flex justify-center items-center ">
        <svg className="block w-full h-full " viewBox="0 0 500 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
            <path
                id="wave"
                d="
                M0 20
                Q3.125 0 6.25 20 T12.5 20 T18.75 20 T25 20 T31.25 20 T37.5 20 T43.75 20 T50 20
                T56.25 20 T62.5 20 T68.75 20 T75 20 T81.25 20 T87.5 20 T93.75 20 T100 20
                T106.25 20 T112.5 20 T118.75 20 T125 20 T131.25 20 T137.5 20 T143.75 20 T150 20
                T156.25 20 T162.5 20 T168.75 20 T175 20 T181.25 20 T187.5 20 T193.75 20 T200 20
                T206.25 20 T212.5 20 T218.75 20 T225 20 T231.25 20 T237.5 20 T243.75 20 T250 20
                T256.25 20 T262.5 20 T268.75 20 T275 20 T281.25 20 T287.5 20 T293.75 20 T300 20
                T306.25 20 T312.5 20 T318.75 20 T325 20 T331.25 20 T337.5 20 T343.75 20 T350 20
                T356.25 20 T362.5 20 T368.75 20 T375 20 T381.25 20 T387.5 20 T393.75 20 T400 20
                T406.25 20 T412.5 20 T418.75 20 T425 20 T431.25 20 T437.5 20 T443.75 20 T450 20
                T456.25 20 T462.5 20 T468.75 20 T475 20 T481.25 20 T487.5 20 T493.75 20 T500 20
                "
                stroke="black"
                fill="none"
                strokeWidth="2"
            />
            </defs>
            <use href="#wave" y="0" />
        </svg>
        </div>
     <div className="w-[58vw] h-4 m-4 absolute  right-[62px] origin-top-right rotate-270 flex justify-center items-center ">
        <svg className="block w-full h-full " viewBox="0 0 500 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
            <path
                id="wave"
                d="
                M0 20
                Q3.125 0 6.25 20 T12.5 20 T18.75 20 T25 20 T31.25 20 T37.5 20 T43.75 20 T50 20
                T56.25 20 T62.5 20 T68.75 20 T75 20 T81.25 20 T87.5 20 T93.75 20 T100 20
                T106.25 20 T112.5 20 T118.75 20 T125 20 T131.25 20 T137.5 20 T143.75 20 T150 20
                T156.25 20 T162.5 20 T168.75 20 T175 20 T181.25 20 T187.5 20 T193.75 20 T200 20
                T206.25 20 T212.5 20 T218.75 20 T225 20 T231.25 20 T237.5 20 T243.75 20 T250 20
                T256.25 20 T262.5 20 T268.75 20 T275 20 T281.25 20 T287.5 20 T293.75 20 T300 20
                T306.25 20 T312.5 20 T318.75 20 T325 20 T331.25 20 T337.5 20 T343.75 20 T350 20
                T356.25 20 T362.5 20 T368.75 20 T375 20 T381.25 20 T387.5 20 T393.75 20 T400 20
                T406.25 20 T412.5 20 T418.75 20 T425 20 T431.25 20 T437.5 20 T443.75 20 T450 20
                T456.25 20 T462.5 20 T468.75 20 T475 20 T481.25 20 T487.5 20 T493.75 20 T500 20
                "
                stroke="black"
                fill="none"
                strokeWidth="2"
            />
            </defs>
            <use href="#wave" y="0" />
        </svg>
        </div>
    
   <div className="w-[93vw] h-4 m-4 absolute bottom-2 flex justify-center items-center ">
        <svg className="block w-full h-full " viewBox="0 0 500 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
            <path
                id="wave"
                d="
                M0 20
                Q3.125 0 6.25 20 T12.5 20 T18.75 20 T25 20 T31.25 20 T37.5 20 T43.75 20 T50 20
                T56.25 20 T62.5 20 T68.75 20 T75 20 T81.25 20 T87.5 20 T93.75 20 T100 20
                T106.25 20 T112.5 20 T118.75 20 T125 20 T131.25 20 T137.5 20 T143.75 20 T150 20
                T156.25 20 T162.5 20 T168.75 20 T175 20 T181.25 20 T187.5 20 T193.75 20 T200 20
                T206.25 20 T212.5 20 T218.75 20 T225 20 T231.25 20 T237.5 20 T243.75 20 T250 20
                T256.25 20 T262.5 20 T268.75 20 T275 20 T281.25 20 T287.5 20 T293.75 20 T300 20
                T306.25 20 T312.5 20 T318.75 20 T325 20 T331.25 20 T337.5 20 T343.75 20 T350 20
                T356.25 20 T362.5 20 T368.75 20 T375 20 T381.25 20 T387.5 20 T393.75 20 T400 20
                T406.25 20 T412.5 20 T418.75 20 T425 20 T431.25 20 T437.5 20 T443.75 20 T450 20
                T456.25 20 T462.5 20 T468.75 20 T475 20 T481.25 20 T487.5 20 T493.75 20 T500 20
                "
                stroke="black"
                fill="none"
                strokeWidth="2"
            />
            </defs>
            <use href="#wave" y="0" />
        </svg>
        </div> 

        <div className='w-[93vw] h-[91vh] absolute flex top-8 left-4 '>
         <div className='w-3/5 h-full flex   justify-center items-center '>
            <div className=' h-2/3 w-2/3 '>
              <Image className='w-full h-full object-contain' unoptimized src={colorVariants[flavour].image} width={40} height={50} alt={"product Image"} />
            </div>
         </div>
         <div className=' h-full w-2/5'>
        
        <div className='h-2/3 flex w-full '>
            <div className='grid grid-cols-3 h-full w-full gap-1'>
                { colorVariants.map((color,i)=>(
                    <div key={i} onClick={()=>{setFlavour(i)}} className='cursor-pointer w-full h-full relative  '>
                         <div className='flex   justify-center items-center w-full h-full'>
                         <Image unoptimized className='h-1/2 w-1/2 object-contain' src={color.image} width={30} height={40} alt='products' />
                         </div>
                         <div className='absolute bottom-2 left-1/4 text-center'>{color.name}</div>
                    </div>
                ))

                }
            </div>
          </div>
   
          <div className='h-1/3 flex flex-col w-full pt-6  '>
         
         <div className='h-1/3 w-full flex justify-center items-start '>
          <div onClick={()=>setQuantity((quantity)=>(quantity-1))} className='cursor-pointer h-12 w-12 border-2 rounded-full py-2 px-1  flex place-content-center '>
            <FaMinus className='inline w-full h-full' />
          </div>

          <div className='text-center ml-2 text-xl flex justify-center items-center w-36 h-12 border-2 rounded-full'>
           {quantity}
          </div>

           <div onClick={()=>setQuantity((quantity)=>(quantity+1))} className='cursor-pointer h-12 w-12 border-2  ml-2 rounded-full py-2 px-1  flex place-content-center '>
            <FaPlus className='inline w-full h-full' />
          </div>
          </div>

          <div className='w-full h-1/3 flex justify-center items-center'>
            <div className=" h-12 w-36 flex justify-center items-center bg-black text-white rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
                Buy Now
            </div>
        </div>

          </div>
         </div>


        </div>

    </div>
  )
}