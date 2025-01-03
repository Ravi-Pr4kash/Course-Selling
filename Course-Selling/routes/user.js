const { Router } = require('express')
const userRouter = Router()
const { userModel } = require('../db')
const jwt = require("jsonwebtoken")
const { JWT_USER_PASSWORD } = require('../config')





userRouter.post('/signup', async function(req,res){
   const { email, password, firstName, lastName } = req.body;

   userModel.create({
    email,
    password,
    firstName,
    lastName
   })
   res.json({
    msg: "signup succeeded"
   })
})

userRouter.post('/signin', async function(req,res){
    const { email, password }  = req.body;

   const user =  await userModel.findOne({
        email,
        password  // hash the psd (bcrypt)
    })
    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD)
        res.json({
            msg: "Sign in Successful", 
            token: token
        })
    } else {
        return res.status(403).json({
            msg: "Incorrect Credentials"
        })
    }
})

userRouter.get('/purchases', function(req,res){   //jo user ne course khride h wo dikhayega

})

module.exports = {
    userRouter: userRouter
}