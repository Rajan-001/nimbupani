'use client'

import { Provider } from "react-redux";
import { store } from "../redux/store";

import Login from "./components/Login";
import SignUp from "./components/SignUpIn";
import SignUpIn from "./components/SignUpIn";


export default function Home() {
  return (
   <div className="relative">
   <Provider store={store}>
   
     <SignUpIn/>
    </Provider>
   </div>
  );
}
