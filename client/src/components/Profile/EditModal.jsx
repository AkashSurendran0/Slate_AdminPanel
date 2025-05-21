import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import userContext from '../../context';
import { useContext } from 'react';

export default function EditUserModal({showModal, user}) {
    const {refresh}=useContext(userContext)
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        state: '',
        district: '',
        phone: '',
        image: '',
        email: ''
    });
    const [formErrors, setFormErrors]=useState({
        name:'',
        phone:'',
        image:''
    })
    useEffect(()=>{
        if(user){
            Object.keys(user).map(key=>{
                setFormData(prev=>({
                    ...prev,
                    [key]:user[key]
                }))
            })
        }
    }, [user])
    const [imagePreview, setImagePreview] = useState(null);
    const [checkImage, setCheckImage] = useState(false)
    const [districts, setDistricts] = useState([]);

    useEffect(()=>{
        user.image? setImagePreview(user.image):''
    }, [])

    const states = [
        { id: 1, name: 'Kerala' },
        { id: 2, name: 'Karnataka' },
        { id: 3, name: 'Goa' },
        { id: 4, name: 'Jammu and Kashmir' },
    ];

    const districtsByState = {
        'Kerala': ['Thiruvananthapuram', 'Ernakulam', 'Kozhikode', 'Alappuzha', 'Wayanad'],
        'Karnataka': ['Bengaluru Urban', 'Mysuru', 'Dakshina Kannada', 'Belagavi', 'Shivamogga'],
        'Goa': ['North Goa', 'South Goa'],
        'Jammu and Kashmir': ['Srinagar', 'Baramulla', 'Anantnag', 'Jammu'],
    };

    useEffect(() => {
        if (formData.state) {
        setDistricts(districtsByState[formData.state] || []);
        setFormData(prev => ({ ...prev, district: '' }));
        }
    }, [formData.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setCheckImage(true)
        const file = e.target.files[0];
        if (file) {
        setFormData(prev => ({ ...prev, image: file }));
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        }
    };

    const handleClose = () => {
        showModal()
    };

    const validateForm = () =>{
        const {name, phone, image}=formData
        if(name.trim()=='' || name.length<=3) return {success:false, message:'Please enter a valid name', field:'name'}
        const phoneRegex = /^[0-9]{10}$/;
        if(phone.trim() && !phoneRegex.test(phone)) return {success:false, message:'Please enter a valid number', field:'phone'}
        if (checkImage && image.name.trim()) {
            const imageRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
            if (!imageRegex.test(image.name)) {
                return { success: false, message: 'Image must be a valid format (jpg, png, etc)', field:'image' };
            }
        }
        return {success:true}
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response=validateForm()
        if(response.success){
            formData.email=user.email
            if(formData.image){
                const editForm=new FormData()
                editForm.append('file', formData.image)
                editForm.append('upload_preset', 'Slate_dashboard')
                const response=await axios.post(`https://api.cloudinary.com/v1_1/djhmcbiq9/image/upload`, editForm)
                formData.image=response.data.secure_url
            }
            const submitResponse=await axios.post('http://localhost:5222/editUser', formData)
            if(submitResponse.data.success){
                toast.success(submitResponse.data.message)
                refresh()
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
            <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
            <button 
                onClick={handleClose} 
                className="text-gray-500 hover:text-gray-700 transition duration-150"
            >
                <X size={20} />
            </button>
            </div>
            
            <div className="p-6">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                Profile Image
                </label>
                <div className="flex items-center justify-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-300 mb-2">
                    {imagePreview ? (
                    <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <div className="flex items-center justify-center h-full">
                        <Upload className="text-gray-400" size={24} />
                    </div>
                    )}
                </div>
                </div>
                <div className="flex justify-center">
                <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm">
                    Choose File
                    <input 
                    type="file" 
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    />
                </label>
                </div>
                <p className='text-red-500'>{formErrors.image}</p>
            </div>
            
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
                <label htmlFor="gender" className="block text-gray-700 text-sm font-medium mb-2">
                Gender
                </label>
                <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
            </div>
            
            <div className="mb-4">
                <label htmlFor="state" className="block text-gray-700 text-sm font-medium mb-2">
                State
                </label>
                <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="">Select State</option>
                {states.map(state => (
                    <option key={state.id} value={state.name}>
                    {state.name}
                    </option>
                ))}
                </select>
            </div>
            
            <div className="mb-4">
                <label htmlFor="district" className="block text-gray-700 text-sm font-medium mb-2">
                District
                </label>
                <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                    <option key={index} value={district}>
                    {district}
                    </option>
                ))}
                </select>
            </div>
            
            <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number
                </label>
                <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className='text-red-500'>{formErrors.phone}</p>
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
                Save Changes
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}