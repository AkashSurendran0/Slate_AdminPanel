import SideBar from "../components/Home/SideBar"
import Navbar from "../components/Home/Navbar"
import UserProfile from "../components/Home/UserProfile"
import Dasboard from "../components/Home/Dashboard"
import UserDetails from "../components/Home/UserDetails"
import Settings from "../components/Home/Settings"
import { useSelector } from "react-redux"

function Home() {
  const currentPage=useSelector((state)=>state.toggleSection)

  return (
    <div className="flex h-screen bg-gray-100">
        <SideBar/>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar/>
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            { currentPage.dashboard && (
              <Dasboard/>
            ) }
            { currentPage.profile && (
              <UserProfile/>
            ) }
            { currentPage.users && (
              <UserDetails/>
            ) }
            { currentPage.settings && (
              <Settings/>
            ) }
          </main>
        </div>
    </div>
  )
}

export default Home
