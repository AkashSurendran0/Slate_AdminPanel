import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import './main.scss'
import {RouteToDashBoard,RouteToLogin} from './security/auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
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
    </>
  )
}

export default App
