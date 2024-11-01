const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const PORT=3000;


 mongoose.connect("mongodb+srv://saravanancharan:sara19032004@cluster0.3vxhy6h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
 console.log("connected")


 app.post('/register', async (req, res) => {
   try {
    const { email: inputEmail, password: inputPassword } = req.body;
 
    
 
    if(!inputEmail || !inputPassword) {
        return res.status(400).json({
            message: "Invalid inputs"
        })
    }
 
     
 
    const isExist = await Users.findOne({ email: inputEmail })
 
 
    if(isExist) {
        return res.status(400).json({
            message: "User with this email already exists"
        })
    }
 
 
    const hashedPass = await bcrypt.hash(inputPassword, 10)

    let verify = await Users.create({ email: inputEmail, password: hashedPass })
 
    if(!verify) {
        return res.status(400).json({
            message: "Error in saving the user"
        })
    }
 
    res.status(200).json({
        message: "Successful"
    })
    }catch (e) {
        res.status(400).json({
        message: e
    })
    }
})
 app.post('/login', async (req, res) => {
  try {
    const { email: inputEmail, password: inputPassword } = req.body;

    if(!inputEmail || !inputPassword) {
        return res.status(400).json({
            message: "Invalid inputs"
        })
    }

    const isExist = await Users.findOne({ email: inputEmail })

    if(!isExist) {
        return res.status(400).json({
            message: "User with this email already exists"
        })
    }

    const isValidPass = await bcrypt.compare(inputPassword, isExist.password)

    if(!isValidPass) {
        return res.status(400).json({
            message: "Please check your password"
        })
    }

    const token = jwt.sign({ email: inputEmail, password: inputPassword }, SECRET)

    console.log(inputEmail)
    
    res.status(200).json({
        message: "Successful",
        token,
    })
  } catch (e) {
      res.status(400).json({
        message: e
    })
  }
})



app.listen(PORT, () => {
    console.log("server is running")
})

            
            