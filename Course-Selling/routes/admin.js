const { Router }  = require("express")
const adminRouter = Router();
const { adminModel, courseModel } = require("../db")
const jwt  = require('jsonwebtoken')
const { JWT_ADMIN_PASSWORD } = require("../config")
const { adminMiddleware } = require('../middleware/admin')

adminRouter.post('/signup', async(req,res)=>{
    const { email, password, firstName, lastName } = req.body;

    await adminModel.create({
     email,
     password,
     firstName,
     lastName
    })
    res.json({
     msg: "signup succeeded"
    })
})

adminRouter.post('/signin',async (req,res)=>{
    const { email, password }  = req.body;

   const admin =  await adminModel.findOne({
        email,
        password  // hash the psd (bcrypt)
    })
    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD)
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

adminRouter.post('/course', adminMiddleware, async(req,res)=>{   //admin course create krega  
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;
     
  const course = await courseModel.create({
    title, description, imageUrl, price, creatorId: adminId
  })
    res.json({msg: "course created", courseId: course._id })
})

adminRouter.put('/course', adminMiddleware,async(req,res)=>{   //admin course update krega  
    const adminId  = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title, description, imageUrl, price, courseId
    })
    res.json({msg: "course updated", courseId: course._id})
})

adminRouter.get('course/bulk', adminMiddleware,async(req,res)=>{   // admin get all the courses 
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    })
    res.json({
        msg: "course Updated",
        courses
    })
})

module.exports = {
    adminRouter
}