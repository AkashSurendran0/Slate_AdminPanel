import {configureStore} from '@reduxjs/toolkit'
import loginReducer from './features/Login_Page/setLogin'
import errorReducer from './features/Login_Page/loginPageErrors'

export const store = configureStore({
    reducer:{
        setLogin:loginReducer,
        loginErrors:errorReducer
    }
})