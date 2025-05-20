const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required:true,
        default:false
    },
    gender:{
        type: String,
        required: false
    },
    state:{
        type: String,
        required: false
    },
    district:{
        type: String,
        required: false
    },
    phone:{
        type: String,
        required: false
    },
    image:{
        type: String,
        required: false
    }
})

const users=new mongoose.model('users', userSchema)
module.exports=users