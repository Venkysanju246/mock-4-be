const express = require('express');
const userRoute = express.Router()  
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth.middleware');

userRoute.post("/register",async (req, res)=>{
   try {
      const payload = req.body 
      bcrypt.hash(payload.password, 5,async (err, hash)=>{
        payload.password = hash
        const newUser = new UserModel(payload)
        await newUser.save()
      })
      res.status(201).send({
         msg:"your registration has been successfully"
      })
      
   } catch (error) {
      res.status(400).send({
         msg: error.message
      })
   }

})

userRoute.post("/login",async (req, res)=>{
   const {email, password} = req.body 
   const userCheck = await UserModel.findOne({email})
   if(userCheck){
      const token = jwt.sign({userID: userCheck._id, userEmail: userCheck.email}, process.env.JWT_SECRET_KEY, {expiresIn:"50m"})
      bcrypt.compare(password, userCheck.password, (err, result)=>{
         if(result){
            return res.status(200).send({
               msg:"Login successful",
               token: token
            })
         }else{
            return res.status(400).send({
               msg:"Invalid password"
            })
         }
      })
   }else{
      return res.status(400).send({
         msg:" No User found"
      })
   }
})

userRoute.patch("/reset", auth, async(req, res)=>{
   try {
      const {userEmail} = req.body
      const {password} = req.body

    
     const check = await UserModel.findOne({email:userEmail})
     if(check){
      const hashed = bcrypt.hashSync(password, 5)
      console.log(hashed)
      const passUpdate = await UserModel.findByIdAndUpdate({_id:check._id, password:password})
      res.status(201).send({
         msg:"passwords updated successfully"
      })
     }else{
      return res.status(400).send({
         msg:"no user email found"
      })
     }
      
   } catch (error) {
      res.status(404).send({
         msg:error.message
      })
   }
  
})

module.exports = userRoute