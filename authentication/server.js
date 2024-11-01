const express = require('express');
const app=express();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const port=3000;
app.use(express.json())


const users={}
const post=['post1','post2','post3']
const SECRET=abc123

app.post('/register',async(req,res)=>{
    const{email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({
            message:"invalid inputs"
 })
    }
})
const isExist=users.hasownproperty(email)

if(isExist) {
    return res.status(400)({
        message:"user with this email already exist"
    })
}
const hashedPass = await bcrypt.hash(password, 10)
users[email]=hashedPass
let verify=users[email]
if(!verify){
    return res.status(400)({
        message:"error in saving the user"
    })
}
res.status(200)({
    message:"successfull"
})
app.post('/login',async(req,res)=>{
    const{email,password}=req.body;
})
if (!email||!password){
    return res.status(400).json({
        message:"invalid inputs"
    })
}
const isExist=users.hasOwnProperty(email)
if(isExist) {
    return res.status(400)({
        message:"please register first"
    })
}
const isvalidPass=await bcrypt.compare(passwoard,users[email])
if(!isvalidPass) {
    return res.status(400).json({
        message:"please check your password"
    })
}

const token=jwt.sign({email,password},SECRET)
res.status(200).json({
    message:"successfull"
})

app.get('/post',async(req,res)=>{
    const token=req.headers['authorization'].split(" ")[1]
    let decoded
    try{
        decoded=jwt.verify(token,SECRET)
    }catch(e){
        res.status(400).json({
            message: "Unauthorized"
        })
    }
    

    
})
const isExist = users.hasOwnProperty(email)

    const isValidPass = await bcrypt.compare(password, users[email])

    if(!isValidPass) {
        return res.status(400).json({
            message: "Unauthorized"
        })
    }
    if(!isExist) {
        return res.status(403).json({
            message: "Please register first"
        })
    }
    
    return res.status(200).json({
        posts
    })

app.listen(PORT, () => {
    console.log(`PORT ${PORT}`)
})