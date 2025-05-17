const mongoose=require('mongoose')
const env=require('dotenv').config()

const connectDB = () =>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Databse connection failed')
    }
}

module.exports=connectDB