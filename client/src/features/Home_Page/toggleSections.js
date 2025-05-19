import { createSlice } from "@reduxjs/toolkit"; 

const toggleSections = createSlice({
    name:'toggleSections',
    initialState:{
        dashboard:true,
        profile:false,
        users:false,
        settings:false
    },
    reducers:{
        setSection:(state, action)=>{
            const {section}=action.payload
            Object.keys(state).map(key=>{
                key==section? state[key]=true:state[key]=false
            })
        }
    }
})

export const {setSection} = toggleSections.actions
export default toggleSections.reducer