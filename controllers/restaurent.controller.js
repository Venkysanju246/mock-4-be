const express = require('express');
const RestaurantModel = require('../models/restaurent.model');
const auth = require('../middleware/auth.middleware');
const resRoute = express.Router()

resRoute.post("/add", auth,async (req, res)=>{
    const payload = req.body;
    const newRestaurent = new RestaurantModel(payload)
    await newRestaurent.save();
    res.status(201).send({
        msg:"restaurant saved successfully"
    })
})

resRoute.get("/get/:id", auth,async (req, res)=>{
    const id = req.params.id;
    const newRestaurent = await RestaurantModel.findOne({userID:id})
  
    res.status(201).send({
        msg:newRestaurent
    })
})
resRoute.get("/menu/:id", auth,async (req, res)=>{
    const id = req.params.id;
    const newRestaurent = await RestaurantModel.findOne({userID:id})
  
    res.status(201).send({
        msg:newRestaurent.menu
    })
})


resRoute.patch("/menu/:id", auth,async (req, res)=>{
    const id = req.params.id;
    let payload = req.body;
    const newRestaurent = await RestaurantModel.findByIdAndUpdate({userID:id}, payload);
  
    res.status(201).send({
        msg:"Menu updated successfully"
    })
})

resRoute.post("/order/:id", auth,async (req, res)=>{
  
    res.status(201).send({
        msg:"Order placed successfully"
    })
})
module.exports = resRoute