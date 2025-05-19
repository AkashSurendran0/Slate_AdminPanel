import React from 'react'

function Settings() {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Settings</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="text-md font-medium mb-2">Notifications</h3>
                    <div className="flex items-center justify-between py-2 border-b">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-600">Receive email updates about account activity</p>
                        </div>
                        <div className="bg-gray-200 relative inline-flex h-6 w-11 items-center rounded-full">
                            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-md font-medium mb-2">Account</h3>
                    <div className="space-y-4">
                        <button className="text-blue-600 hover:text-blue-800">Change Password</button>
                        <button className="block text-red-600 hover:text-red-800">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
