import React from 'react'

function UserDetails() {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">User Details</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3].map((user) => (
                        <tr key={user}>
                            <td className="px-6 py-4 whitespace-nowrap">User {user}</td>
                            <td className="px-6 py-4 whitespace-nowrap">user{user}@slate.com</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user === 1 ? 'Admin' : 'User'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user !== 3 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {user !== 3 ? 'Active' : 'Inactive'}
                            </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserDetails
