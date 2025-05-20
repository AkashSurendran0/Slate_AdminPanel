import React from 'react'
import {UserCircle, Pen} from 'lucide-react'
import { useContext, useState } from 'react'
import userContext from '../../context'
import EditUserModal from '../Profile/EditModal'

function UserProfile() {
    const {user}=useContext(userContext)
    const [editModal, showEditModal]=useState(false)

    const toggleModal = () =>{
        showEditModal(!editModal)
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className='flex justify-between'>
                <h2 className="text-lg font-medium mb-4">Profile</h2>
                <button onClick={toggleModal} className='flex items-center gap-2 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition-colors'>Edit Profile<Pen className="text-gray-600" size={20} /></button>
            </div>
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                        { user && user.image ? (
                            <img src={`${user.image}`} />
                        ):(
                            <UserCircle className="text-gray-600" size={48} />
                        ) }
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">{ user && user.name }</h3>
                        <p className="text-gray-600">{ user && user.email }</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" className="w-full p-2 border rounded" defaultValue={user && user.name} disabled/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" className="w-full p-2 border rounded" defaultValue={ user && user.email } disabled/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input type="text" className="w-full p-2 border rounded" defaultValue={user && user.phone? user.phone:'0000000000'} disabled/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <input type="email" className="w-full p-2 border rounded" defaultValue={ user && user.gender? user.gender:'Select a gender' } disabled/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input type="text" className="w-full p-2 border rounded" defaultValue={user && user.state? user.state:'Select a state'} disabled/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                        <input type="email" className="w-full p-2 border rounded" defaultValue={ user && user.district? user.district:'Select a district' } disabled/>
                    </div>
                </div>
            </div>
            { editModal && 
                <EditUserModal showModal={toggleModal} user={user}/>
            }
        </div>
    )
}

export default UserProfile
