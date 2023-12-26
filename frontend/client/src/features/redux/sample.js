import { createSlice } from "@reduxjs/toolkit";

export const countSlice =  createSlice({

    name:'count',
    initialState:{
        value:0
    },
    reducers:{
        increment:(state,action)=>{
            state.value = action.payload.incrementCount
        }
    }
})
export const {incrementCount} = countSlice.actions
export default countSlice.reducer