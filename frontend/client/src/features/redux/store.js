import {  configureStore } from "@reduxjs/toolkit";
import countReducer from './sample'

export default configureStore({
    reducer:{
        
        count:countReducer
    }
})