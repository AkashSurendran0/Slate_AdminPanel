import { Navigate } from "react-router-dom";

export const RouteToLogin = ({children}) =>{
    const token=localStorage.getItem('userToken')
    
    if(!token){
        console.log(token)
        return <Navigate to='/login' replace/>
    }
    
    return children
}

export const RouteToDashBoard = ({children}) =>{
    const token=localStorage.getItem('userToken')

    if(token){
        console.log(token)
        return <Navigate to='/' replace/>
    }
        
    return children
}
