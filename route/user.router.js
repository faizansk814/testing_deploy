const express = require('express')
const userRouter = express.Router()
const UserModel = require("../model/user.model")
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')



userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password, age } = req.body
        bcrypt.hash(password, 5, async (err, hash)=> {
            const user = new UserModel({ name, email, password: hash, age })
            await user.save()
            res.status(200).send({"msg":"Registration Succesful"})
        });
    } catch (error) {
        res.status(400).send({ "msg": "Some error" })
    }

})

userRouter.post("/login",async (req, res) => {
     const {email,password}=req.body
     const data=await UserModel.findOne({email}) //{_id:....,name,pass,age}
     if(data){
        bcrypt.compare(password, data.password, function(err, result) {
            if(result){  
                res.status(200).send({"msg":"Login Succesful","token":jwt.sign({"userID":data._id},"DC",{expiresIn:"1h"})})
            }else{
                res.status(400).send({"msg":"Wrong Credentials"})
            }
        });
     }else{
        res.status(404).send({"msg":"User Not Found"})
     }


})
module.exports=userRouter