const express=require('express')
const routes=express.Router()
const userController=require('../controllers/userController')

routes.route('/userSignIn')
    .post(userController.signInNewUser)

routes.route('/userLogIn')
    .post(userController.userLogIn)

routes.route('/retrieveUserDetails')
    .post(userController.getUserDetails)
    .get(userController.getAllUserDetails)

routes.route('/editUser')
    .post(userController.editUser)

routes.route('/deleteUser')
    .post(userController.deleteUser)

routes.route('/appointAdmin')
    .post(userController.alterAdmin)

module.exports=routes