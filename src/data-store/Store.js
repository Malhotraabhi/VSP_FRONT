import { configureStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./features/LoginSlice";
import { SearchReducer } from "./features/SearchQuerySlice";


let store=configureStore({
    reducer:{
        Login:LoginReducer,
        Query:SearchReducer
    }
})

export {
    store
}