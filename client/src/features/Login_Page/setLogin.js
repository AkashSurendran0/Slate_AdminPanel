import {createSlice} from '@reduxjs/toolkit'

const setLoginSlice=createSlice({
    name:'setLogin',
    initialState:{
        value:true
    },
    reducers:{
        showLogin:(state)=>{
            state.value=true
        },
        showSignIn:(state)=>{
            state.value=false
        }
    }
})

export const {showLogin, showSignIn}=setLoginSlice.actions
export default setLoginSlice.reducer