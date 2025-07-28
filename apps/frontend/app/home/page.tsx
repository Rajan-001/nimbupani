"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { HomePage } from '../../screen/HomePage'
import { store } from '../../redux/store'



export default function  Home  () {
  return (
    <div>
        <Provider store={store}>
        <HomePage/>
     </Provider>
        </div>
  )
}