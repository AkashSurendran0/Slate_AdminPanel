import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../../features/Home_Page/toggleSidebar'
import { setSection } from '../../features/Home_Page/toggleSections'
import { Menu, X, Home, UserCircle, Users, Settings } from 'lucide-react'

function SideBar() {
    const dispatch=useDispatch()
    const activeSidebar=useSelector((state)=>state.toggleSidebar.value)
    const activeSection=useSelector((state)=>state.toggleSection)
    console.log(activeSection)

    const menuItems = [
        { id: 'dashboard', icon: <Home size={20} />, name: 'Dashboard' },
        { id: 'profile', icon: <UserCircle size={20} />, name: 'Profile' },
        { id: 'users', icon: <Users size={20} />, name: 'User Details' },
        { id: 'settings', icon: <Settings size={20} />, name: 'Settings' },
    ];

    return (
            <div className={`bg-gray-800 text-white ${activeSidebar? 'w-64':'w-20'} transition-all duration-300 ease-in-out flex flex-col`}>
                <div className='p-4 flex items-center justify-between'>
                    {activeSidebar && <h1 className='text-xl font-bold'>Slate</h1>}
                    <button onClick={()=>dispatch(toggleSidebar())} className='p-2 rounded-md hover:bg-gray-700'>
                        {activeSidebar? <X size={20}/>:<Menu size={20}/>}
                    </button>
                </div>

                <div className='flex-1 overflow-y-auto py-4'>
                    <ul className='space-y-1'>
                        {menuItems.map(item=>(
                            <li key={item.id}>
                                <button onClick={()=>dispatch(setSection({section:item.id}))} className={`flex items-center ${activeSidebar? 'justify-start px-4':'justify-center px-2'} py-3 w-full hover:bg-gray-700 transition-colors ${activeSection[item.id]? 'bg-gray-500':''}`}>
                                    <span className='inline-flex'>{item.icon}</span>
                                    {activeSidebar && <span className='ml-3'>{item.name}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>          
    )
}

export default SideBar
