const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req, res, next)=>{
    const token = req.headers.authorization
    if(token){
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded)=>{
        if(err){
            return res.status(400).send({
                msg:err.message
            })
        }
       req.body.userID = decoded.userID
       req.body.userEmail = decoded.userEmail
       next()
    }) 
    }else{
        return res.status(401).send({
            msg:"No Toekn found"
        })
    }
}

module.exports = auth