import { createSlice } from "@reduxjs/toolkit";



let SearchQuerySlice=createSlice({
    name:"SearchQuery",
    initialState:{
        query:""
    },
    reducers:{
        changeQuery:(state,payload)=>{
            console.log(payload.payload)
            state.query=payload.payload
        }
    }
})


let SearchReducer=SearchQuerySlice.reducer
let {changeQuery}=SearchQuerySlice.actions

export{
    SearchQuerySlice,
    SearchReducer,
    changeQuery
}