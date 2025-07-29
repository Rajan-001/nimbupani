"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { colorVariants } from './HomePage';
import { BsFillCartCheckFill } from "react-icons/bs";



export const Cart = () => {
 const [flavour,setFlavour]=useState(1)
 const[quantity,setQuantity]=useState(0)
 const [products,SetProducts]=useState([])
 const [loaded,SetLoaded]=useState(false)
 const [cartClicked,SetCartClicked]=useState(false)
 useEffect(()=>{
  async function fetchProductDetails(){
    console.log()
const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/get-all-product-detail`)
const products=await response.json();
 SetProducts(products)
 SetLoaded(true)
  }
  fetchProductDetails()
 },[])



  async function addToCart() {
    try {
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId:products[flavour]?.id,
        quantity,
        
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to add to cart");
    }

    console.log("✅ Cart updated:", data);
    return data;
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
  }
  }
 
   const checkOut=async()=>{
    try{
  const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-order`)
      const order = await response.json();
    console.log("✅ Order Created:", order.id);

       // ✅ 2️⃣ Open Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // ✅ Public Key (from Razorpay Dashboard)
      amount: order.amount,
      currency: "INR",
      name: ` Plan`,
      description: `Payment for  Plan`,
      order_id: order.id, // ✅ Razorpay order_id from backend
      handler: async function (response: any) {
        console.log("✅ Razorpay Response:", response.razorpay_signature);

        // ✅ 3️⃣ Send payment details to backend for signature verification
        const verifyRes = await fetch("http://localhost:8000/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order.order_Id,   // 👈 comes from backend when creating order
            status: order.status       // 👈 you can send CREATED or SUCCESS etc.
          }),
        }); 
     }
    }
      // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
  }

useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
   script.onload = () => console.log("✅ Razorpay script loaded");
  document.body.appendChild(script);
}, []);


  return (
    <div className='w-screen h-screen relative bg-yellow-50'>
      { loaded && 
      <>
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
         <div className='w-3/5 h-full flex   justify-center items-center relative '>
            <div className=' h-2/3 w-2/3  '>
              <Image className='w-full h-full object-contain' unoptimized src={products[flavour].image_url} width={40} height={50} alt={"product Image"} />
             
            </div>
             <div className="absolute top-14 right-32 circle w-24 h-24 text-xl text-center flex flex-col justify-center items-center"> <div>{products[flavour].quantity}</div><div>left</div></div>
             <div className="absolute bottom-12 left-[250px] w-32 h-14 flex justify-center items-center bg-neutral-800 text-gray-100 text-xl">
           <div><Image width={20} height={34} unoptimized className='object-cover w-10 h-10' src={"/svg/ruppe.svg"} alt={''}  /></div>
           <div className='w-2'></div>
           <div>{products[flavour].selling_price}</div>
            </div>
        <div className='absolute top-8  text-center text-2xl flex font-semibold justify-center items-center w-full h-14'>{products[flavour].name}</div>
         </div>
         <div className=' h-full w-2/5'>
        
        <div className='h-2/3 flex w-full '>
            <div className='grid grid-cols-3 h-full w-full gap-1'>
                { products.map((color,i)=>(
                    <div key={i} onClick={()=>{setFlavour(i)}} className='cursor-pointer w-full h-full relative  '>
                         <div className='flex   justify-center items-center w-full h-full'>
                         <Image unoptimized className='h-1/2 w-1/2 object-contain' src={colorVariants[i].image} width={30} height={40} alt='products' />
                         </div>
                         <div className='absolute bottom-2  text-center text-sm flex font-semibold justify-center items-center w-full h-14'>{color.name}</div>
                         <div className="absolute top-8 right-4 circle w-10 h-10 text-sm text-center flex flex-col justify-center items-center"> <div>{color.quantity}</div><div>left</div></div>
                          <div className="absolute -bottom-4 left-1/4 flex items-center gap-2 px-3 py-1.5 bg-neutral-800 text-gray-100 text-sm rounded-md shadow-md">
                          <Image
                            width={20}
                            height={20}
                            unoptimized
                            className="w-4 h-4 object-contain"
                            src="/svg/ruppe.svg"
                            alt="Rupee"
                          />
                          <span className="font-semibold">{color.selling_price}</span>
                        </div>

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
            <div onClick={()=>{SetCartClicked(true);addToCart()}} className=" h-12 w-36 flex justify-center items-center bg-black text-white rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
                Buy Now
            </div>
        </div>

          </div>
         </div>


        </div>

          <button className="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown">
        <i className="fas fa-shopping-cart fa-2x"></i><sub id="clickme">0</sub>
        <span className="caret "></span>
    </button>
     <div><BsFillCartCheckFill className='w-10 h-10 text-black absolute top-2 right-44'/></div>
     {
      cartClicked && <div className="mx-auto w-4/5 absolute top-10 right-36">
  <div className="relative float-right mt-5 w-80 rounded-md bg-white p-5 shadow-md">
    
    {/* Header */}
    <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
      <div className="flex items-center">
        <i className="fa fa-shopping-cart text-2xl text-gray-700 mr-2"></i>
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">3</span>
      </div>
      <div className="text-right">
        <span className="text-gray-500 text-sm mr-1">Total:</span>
        <span className="text-blue-500 font-semibold">$2,229.97</span>
      </div>
    </div>

    {/* Items */}
    <ul className="pt-5">
      <li className="mb-5 flex">
        <img
          className="w-12 h-12 object-cover mr-3"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item1.jpg"
          alt="item1"
        />
        <div>
          <span className="block text-base pt-1">Sony DSC-RX100M III</span>
          <span className="text-blue-500 font-medium mr-2">$849.99</span>
          <span className="text-gray-500 text-sm">Quantity: 01</span>
        </div>
      </li>

    
    </ul>

    {/* Checkout Button */}
    <a
      href="#"
      onClick={()=>checkOut()}
      className="block bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-md text-lg mt-6 mb-4"
    >
      Checkout
    </a>

    {/* Pointer Arrow (pseudo-element replacement) */}
    <div className="absolute -top-2 right-10 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-200"></div>
  </div>
</div>

     }
        </>
     } 
    </div>
  )
}