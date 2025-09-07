"use client"
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Footer } from "../../screen/Footer";
import { HomePage } from "../../screen/HomePage";
import { Products } from "../../screen/Products";
import { Story } from "../../screen/Story";
import Providers from "../components/Providers";

export default function Home() {
  return (
   <div className="relative">
  
       <Providers>
           <Provider store={store}>
       
         <HomePage/>
         <Products/>
         <Story/>
        
         <Footer/>
       
         </Provider>
         </Providers>
           
   </div>
  );
}
