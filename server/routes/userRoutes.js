const express=require('express')
const routes=express.Router()
const userController=require('../controllers/userController')

routes.route('/userSignIn')
    .post(userController.signInNewUser)

routes.route('/userLogIn')
    .post(userController.userLogIn)

module.exports=routes