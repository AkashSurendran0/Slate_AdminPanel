import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {Pen, Trash, Plus, UserCircle} from 'lucide-react'
import EditUserModal from '../Profile/EditModal'
import { useContext } from 'react'
import userContext from '../../context'
import CreateUserModal from '../Profile/newUserModal'

function UserDetails() {
    const {user}=useContext(userContext)
    const [allUser, setAllUsers]=useState()
    const [editModal, showEditModal]=useState(false)
    const [newUserModal, showNewUserModal]=useState(false)
    const [userDetails, setUserDetails]=useState()
    const [refreshUsers, setRefresh]=useState(false)
    const [searchUser, setSearchUser]=useState('')
    useEffect(()=>{
        axios.get('http://localhost:5222/retrieveUserDetails')
        .then(response=>{
            console.log(response.data.allUsers)
            if(response.data.success){
                setAllUsers(response.data.allUsers)
            }else{
                toast.error(response.data.message)
            }
        })
    },[refreshUsers])

    const toggleModal = (user) =>{
        showEditModal(!editModal)
        setUserDetails(user)
    }

    const toggleNewUserModal = () =>{
        showNewUserModal(!newUserModal)
    }
    
    const refreshCollection = () =>{
        setRefresh(!refreshUsers)
    }

    const getSearchUser = async (e) =>{
        setSearchUser(e.target.value)
    }

    const toggleAdmin = async (email) =>{
        const response=await axios.post('http://localhost:5222/appointAdmin', {email:email})
        if(response.data.success){
            refreshCollection()
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    }

    const deleteUser = (email) =>{
        console.log(email)
        toast(({ closeToast }) => (
                <div className="text-sm text-yellow-800">
                    <p className="mb-2">Are you sure you want to delete this user?</p>
                    <div className="flex gap-2">
                        <button
                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={ async () => {
                            const response = await axios.post('http://localhost:5222/deleteUser', {email:email})
                            if(response.data.success){
                                refreshCollection()
                                toast.success(response.data.message)
                            }else{
                                toast.error(response.data.message)
                            }
                            closeToast();
                        }}
                        >
                        Yes
                        </button>
                        <button
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                        onClick={closeToast}
                        >
                        No
                        </button>
                    </div>
                </div>
            ),
            { autoClose: false }
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className='flex justify-between'>
                <h2 className="text-lg font-medium mb-4">User Details</h2>
                <button className='p-2 bg-gray-100 rounded-lg flex items-center justify-center mb-2' onClick={toggleNewUserModal}>Create new user<Plus/></button>
            </div>
            <div className='flex items-center gap-3 mb-3'>
                <p>Search User:</p>
                <input type="text" value={searchUser} onChange={getSearchUser} className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {allUser && allUser.filter(obj=>obj.email!=user.email).filter(user=>user.name.toLowerCase().startsWith(searchUser.toLowerCase())).map((allUser, index) => 
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className='w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center'>
                                        {allUser.image? <img src={allUser.image} alt="" />:<UserCircle className="text-gray-600" size={48}/>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{allUser.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{allUser.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{allUser.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{allUser.state}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{allUser.district}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{allUser.gender}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{allUser.isAdmin? 'Admin':'User'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs gap-2 leading-5 font-semibold rounded-full `}>
                                    <button className='p-2 bg-gray-100 rounded-lg' onClick={()=>toggleModal(allUser)}><Pen/></button>
                                    <button className='p-2 bg-gray-100 rounded-lg' onClick={()=>deleteUser(allUser.email)}><Trash/></button>
                                    <button className={`p-2 rounded-lg ${allUser.isAdmin? 'bg-red-200':'bg-green-200'}`} onClick={()=>toggleAdmin(allUser.email)}>{allUser.isAdmin? 'Remove Admin':'Make as Admin'}</button>
                                </span>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
            { editModal && 
                <EditUserModal showModal={toggleModal} user={userDetails}/>
            }
            { newUserModal &&
                <CreateUserModal showNewModal={toggleNewUserModal} refresh={refreshCollection}/>
            }
        </div>
    )
}

export default UserDetails
