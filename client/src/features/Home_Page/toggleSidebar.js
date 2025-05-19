import { createSlice } from "@reduxjs/toolkit";

const toggleSidebarSlice = createSlice({
    name:'toggleSidebar',
    initialState:{
        value:false
    },
    reducers:{
        toggleSidebar:(state)=>{
            state.value=!state.value
        }
    }
})

export const {toggleSidebar}=toggleSidebarSlice.actions
export default toggleSidebarSlice.reducer