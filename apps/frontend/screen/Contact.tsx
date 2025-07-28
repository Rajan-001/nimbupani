"use client"
import React from 'react'
import Image from 'next/image'
import { Header } from '../app/components/Header'

export const Contact = () => {
  return (
    <div className=' bg-yellow-50'>
      <div className='pt-8 bg-yellow-50'>
      <Header text='Contact us' />
      </div>
        <div className='h-[120vh] w-screen flex  justify-center items-center'>
          <div className='h-screen w-screen rounded-2xl  mx-12 py-12 px-12 bg-white'>
        <div className='h-[80vh] w-[calc(100vw-200px)] grid grid-cols-2 '>
          <div className='w-full h-full  text-blue-950 px-4'>
            <div className='text-5xl font-bold'>Contact</div>
            <div className='text-lg font-medium mt-4'>Heb je een vraag, een opmerking, een heel goed idee of een klacht? Dit horen we natuurlijk graag! Neem contact met ons op via dit formulier.</div>
            <div className='text-xl uppercase font-semibold mt-6'>hellocharlie@drinkcharlies.com</div>
            <input type='text' className='w-full mt-4 py-2 bg-gray-200 place-content-start place-items-center pl-4 text-black rounded-xl italic' placeholder='Name *'></input>
              <input type='email' className='w-full mt-4 py-2 bg-gray-200 place-content-start place-items-center pl-4 text-black rounded-xl italic' placeholder='Email *'></input>
          
             <textarea className='w-full mt-4 pt-4 pb-12 bg-gray-200 place-content-start place-items-center pl-4 text-black rounded-xl italic' placeholder='Message *'></textarea>
          
             <button className='uppercase text-white whitespace-nowrap bg-blue-950 px-2 py-4 mt-6 rounded-2xl '>Send To Charles </button>
             </div>
            
            <div className=' w-full h-full'>
               <Image unoptimized className='w-full px-4 object-contain h-1/2' width={30} height={50} alt="Product Image"  src="/images/contact-image/productImg.avif"/>
            </div>

        </div>
        </div>

        </div>
    </div>
  )
}