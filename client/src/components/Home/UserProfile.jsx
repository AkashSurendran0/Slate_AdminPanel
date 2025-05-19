import React from 'react'
import {UserCircle} from 'lucide-react'

function UserProfile() {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Profile</h2>
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                        <UserCircle className="text-gray-600" size={48} />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Admin User</h3>
                        <p className="text-gray-600">admin@slate.com</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" className="w-full p-2 border rounded" defaultValue="Admin User" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" className="w-full p-2 border rounded" defaultValue="admin@slate.com" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
