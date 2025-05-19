import axios from 'axios'
import {useEffect, useState} from 'react'
import { toast } from 'react-toastify'

function Dashboard() {
    const [user, setUser]=useState()
    
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
        },[])
    })

    return (
        <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-lg font-medium mb-4'>Dashboard </h2>
            <p className='text-gray-600'>Welcome to slate dashboard {user && user.name}!</p>
        </div>
    )
}

export default Dashboard
