import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import './main.scss'
import {RouteToDashBoard,RouteToLogin} from './security/auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store'
import { Provider } from 'react-redux'

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={
              <RouteToDashBoard> 
                <Login/>
              </RouteToDashBoard> 
              }/>
            <Route path='/' element={
              <RouteToLogin>
                <Home/>
              </RouteToLogin>
              }/>
          </Routes>
          <ToastContainer
            autoClose={1500}
            pauseOnHover
            theme='colored'
          />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
