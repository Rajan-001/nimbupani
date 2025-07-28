import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState={
    value:0
}
 
const carSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        increment:(state)=>{
         state.value=(state.value+1)%6
        }
    } 
 })

 export const {increment}=carSlice.actions

 export default carSlice.reducer

 export const selectCount=(state:RootState)=>state.cart.value