import { Navigate } from "react-router-dom";
import { isTokenExpired } from "./jwtValidator";

export const RouteToLogin = ({children}) =>{
    const token=JSON.parse(localStorage.getItem('userInfo'))
    
    if(!token || isTokenExpired(token)){
        localStorage.removeItem('userInfo')
        return <Navigate to='/login' replace/>
    }
    
    return children
}

export const RouteToDashBoard = ({children}) =>{
    const token=JSON.parse(localStorage.getItem('userInfo'))

    if(token){
        console.log(token)
        return <Navigate to='/' replace/>
    }
        
    return children
}
