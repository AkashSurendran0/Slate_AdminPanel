const express = require('express')
const nocache = require('nocache')
const env=require('dotenv').config()
const userRoutes=require('./routes/userRoutes')
const connectDB=require('./helpers/db')
const cors=require('cors')

const app = express()

connectDB()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(nocache())
app.use('/', userRoutes)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}!`))