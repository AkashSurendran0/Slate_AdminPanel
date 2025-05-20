const express=require('express')
const env=require('dotenv').config()
const users=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const jwt_secret=process.env.JWT_SECRET

const signInNewUser = async (req,res) =>{
    try {
        const {name, email, password}=req.body
        const existingUser=await users.findOne({
            email:email
        })
        if(existingUser) return res.json({success:false, message:'User with the email already exists'})
        const hashedPass=await bcrypt.hash(password, 10)
        try {
            await users.insertOne({
                name:name,
                email: email,
                password: hashedPass
            })
            const token=jwt.sign({email: email}, jwt_secret, {expiresIn:'1h'})
            return res.json({success:true, message:'User created Successfully', email:email, token})
        } catch (error) {
            return res.json({success:false, message:'Server error occured'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Internal server error'})
    }
}

const userLogIn = async (req,res) =>{
    try {
        const {email, password}=req.body
        const existingUser=await users.findOne({
            email:email
        })
        if(!existingUser) return res.json({success:false, message:'User doesnt exist'})
        const passMatch=await bcrypt.compare(password, existingUser.password)
        if(!passMatch) return res.json({success:false, message:'Invalid credentials'})
        const token=jwt.sign({email:email}, jwt_secret, {expiresIn:'1h'})
        res.json({success:true, message:'User logged Successfully', email:email, token})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Internal Server Error'})
    }
}

const getUserDetails = async (req,res) =>{
    try {
        const {email}=req.body
        const userDetails=await users.findOne({email:email})
        if(!userDetails) return res.json({success:false, message:'User not found. Please log in again'})
        res.json({success:true, userDetails})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Internal Server Error'})
    }
}

const editUser = async (req,res)=>{
    try {
        const {name, email, gender, state, district, phone, image}=req.body
        console.log(req.body)

        try {
            await users.updateOne(
                {email:email},
                {
                    name:name,
                    gender:gender,
                    state:state,
                    district:district,
                    phone:phone,
                    image:image
                }
            )
            res.json({success:true, message:'User updated successfully'})
        } catch (error) {
            res.json({success:false, message:'Internal Server Error'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server error'})
    }
}

module.exports={
    signInNewUser,
    userLogIn,
    getUserDetails,
    editUser
}