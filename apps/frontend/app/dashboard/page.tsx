"use client"
import React from 'react'
import { Footer } from '../../screen/Footer'
import { HomePage } from '../../screen/HomePage'
import { Products } from '../../screen/Products'
import { Story } from '../../screen/Story'
import Providers from '../components/Providers'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'



export default function page() {
  return (
    <div className='relative'>
   <Providers>
       <Provider store={store}>
   
     <HomePage/>
     <Products/>
     <Story/>
    
     <Footer/>
   
     </Provider>
     </Providers>
       </div>
  )
}