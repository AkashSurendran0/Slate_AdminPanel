import LoginForm from "../components/Login/LoginForm"
import {Provider} from 'react-redux'
import { store } from "../store"

function Login() {
  return (
    <>
      <Provider store={store}>
        <LoginForm/>
      </Provider>
    </>
  )
}

export default Login
