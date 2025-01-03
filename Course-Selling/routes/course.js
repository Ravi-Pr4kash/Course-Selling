const { Router }  = require("express")
const courseRouter = Router()
const { courseModel } = require('../db')



courseRouter.get('/preview', function(req,res){


})



 courseRouter.post('/purchase', function(req,res){ //jab user ko koi course khridna hoga tab 

 })


module.exports = {
    courseRouter: courseRouter
}