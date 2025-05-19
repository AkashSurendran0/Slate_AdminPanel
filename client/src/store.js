import {configureStore} from '@reduxjs/toolkit'
import loginReducer from './features/Login_Page/setLogin'
import errorReducer from './features/Login_Page/loginPageErrors'
import showSidebar from './features/Home_Page/toggleSidebar'
import toggleSection from './features/Home_Page/toggleSections'

export const store = configureStore({
    reducer:{
        setLogin:loginReducer,
        loginErrors:errorReducer,
        toggleSidebar:showSidebar,
        toggleSection:toggleSection
    }
})