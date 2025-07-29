'use client'

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Footer } from "../screen/Footer";
import { HomePage } from "../screen/HomePage";
import { Products } from "../screen/Products";
import { Story } from "../screen/Story";
import { Cart } from "../screen/Cart";


export default function Home() {
  return (
   <div className="relative">
   <Provider store={store}>
    {/* <HomePage/>
     <Products/>
     <Story/> */}
     <Cart/>
     <Footer/>
    </Provider>
   </div>
  );
}
