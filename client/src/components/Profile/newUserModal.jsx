import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function CreateUserModal({showNewModal, refresh}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword:''
    });
    const [formErrors, setFormErrors]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClose = () => {
        showNewModal()
    };

    const validateForm = () =>{
        const namePattern=/^[A-Za-z ]{2,50}$/
        if(!namePattern.test(formData.name)){
            return {success: false, field:'name', message:'Enter a proper name'}
        }
        const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailPattern.test(formData.email)){
            return {success: false, field:'email', message:'Enter a proper email'}
        }
        if(formData.password.trim().length<5){
            return {success: false, field:'password', message:'Password must be minimum 5 letters'}
        }
        if(!/[A-Z]/.test(formData.password)){
            return {success: false, field:'password', message:'Must contain minimum one capital letter'}
        }
        if(!/[!@#$%^&*]/.test(formData.password)){
            return {success: false, field:'password', message:'Must contain alteast one special character'}
        }
        if(formData.password!==formData.confirmPassword){
            return {success: false, field:'confirmPassword', message:'Passwords doesnt match'}
        }
        return {success: true}
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response=validateForm()
        if(response.success){
            const submitResponse=await axios.post('http://localhost:5222/userSignIn', formData)
            if(submitResponse.data.success){
                refresh()
                toast.success(submitResponse.data.message)
                handleClose();
            }else{
                toast.error(submitResponse.data.message)
            }
        }else{
            setFormErrors({
                [response.field]: [response.message]
            });
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Create User</h2>
            <button 
                onClick={handleClose} 
                className="text-gray-500 hover:text-gray-700 transition duration-150"
            >
                <X size={20} />
            </button>
            </div>
            
            <div className="p-6">
            
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                Name
                </label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className='text-red-500'>{formErrors.name}</p>
            </div>

            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                Email
                </label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className='text-red-500'>{formErrors.email}</p>
            </div>

            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                Password
                </label>
                <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className='text-red-500'>{formErrors.password}</p>
            </div>

            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password
                </label>
                <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className='text-red-500'>{formErrors.confirmPassword}</p>
            </div>
            
            <div className="flex justify-end space-x-2">
                <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150"
                >
                Cancel
                </button>
                <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150"
                >
                Create User
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}