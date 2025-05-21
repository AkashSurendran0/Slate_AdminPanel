import SideBar from "../components/Home/SideBar"
import Navbar from "../components/Home/Navbar"
import UserProfile from "../components/Home/UserProfile"
import Dashboard from "../components/Home/Dashboard"
import UserDetails from "../components/Home/UserDetails"
import { useSelector } from "react-redux"
import {useEffect, useState} from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import userContext from "../context"

function Home() {
  const currentPage=useSelector((state)=>state.toggleSection)
  const [user, setUser]=useState()
  const [refreshUsers, setRefresh]=useState(false)

  const refresh = () =>{
    setRefresh(!refreshUsers)
  }
    
  useEffect(()=>{  
      const loggedUser=JSON.parse(localStorage.getItem('userInfo'))
      const userEmail=loggedUser.email
      axios.post('http://localhost:5222/retrieveUserDetails', {email:userEmail})
      .then(response=>{
          if(response.data.success){
              setUser(response.data.userDetails)
          }else{
              toast.error(response.data.message)
          }
      })
  }, [refreshUsers])

  return (
    <userContext.Provider value={{user, refresh}}>
      <div className="flex h-screen bg-gray-100">
          <SideBar/>
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar/>
            <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
              { currentPage.dashboard && (
                <Dashboard/>
              ) }
              { currentPage.profile && (
                <UserProfile/>
              ) }
              { currentPage.users && (
                <UserDetails/>
              ) }
            </main>
          </div>
      </div>
    </userContext.Provider>
  )
}

export default Home
