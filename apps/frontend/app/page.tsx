'use client'

import { Provider } from "react-redux";
import { store } from "../redux/store";

import Login from "./components/Login";
import SignUp from "./components/SignUpIn";
import SignUpIn from "./components/SignUpIn";
import { Footer } from "../screen/Footer";
import { HomePage } from "../screen/HomePage";
import { Products } from "../screen/Products";
import { Story } from "../screen/Story";
import Providers from "./components/Providers";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "./components/Button";


export default function Home() {
   const ref = useRef(null);
    const [position, setPosition] = useState({x:0,y:0});

    const handleMouse = (e: { clientX: any; clientY: any; }) => {
        const { clientX, clientY } = e;
        //@ts-ignore
        const {height, width, left, top} = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width/2)
        const middleY = clientY - (top + height/2)
        setPosition({x: middleX, y: middleY})
    }

    const reset = () => {
        setPosition({x:0, y:0})
    }

    const { x, y } = position;
    const router=useRouter()
  return (
   <div className="relative">
  
       <Providers>
           <Provider store={store}>
        <div
        className="relative mt-4"
        >
        <motion.div ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{x, y}}
            transition={{type: "spring", stiffness: 150, damping: 15, mass: 0.1}}
            onClick={()=>{router.push("/order")}}  className="absolute top-12 right-1/2 z-50">
        <Button  buttonText={"Buy Now"}/>

        </motion.div>
        </div>
         <HomePage/>
         <Products/>
         <Story/>
        
         <Footer/>
       
         </Provider>
         </Providers>
           
   </div>
  );
}
