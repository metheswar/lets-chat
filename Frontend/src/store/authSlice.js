import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name:'auth',
    initialState:{
        authenticated: false,
    },
    reducers:{
        loginHandler:(state)=>{
            state.authenticated = true
        },
        logoutHandler:(state)=>{
            state.authenticated=false;
            state.premium=false;
        },
    }
})
export const {loginHandler,logoutHandler} = authSlice.actions;
export default authSlice.reducer;