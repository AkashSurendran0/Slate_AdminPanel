const express=require('express')
const routes=express.Router()
const userController=require('../controllers/userController')

routes.route('/userSignIn')
    .post(userController.signInNewUser)

routes.route('/userLogIn')
    .post(userController.userLogIn)

routes.route('/retrieveUserDetails')
    .post(userController.getUserDetails)

routes.route('/editUser')
    .post(userController.editUser)

module.exports=routes