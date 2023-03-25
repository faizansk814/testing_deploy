const express = require('express')
const noteRouter = express.Router()
const NoteModel = require("../model/note.model")
const jwt = require('jsonwebtoken')
noteRouter.get("/", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, "DC")  // {userID:.....}
    console.log(decoded)
    try {
        if (decoded) {
            const data = await NoteModel.find({ "userID": decoded.userID }) //mujhe khali usi ka notes milega
            res.status(200).send(data)
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})
noteRouter.post("/post", async (req, res) => {
    try {
        const data = new NoteModel(req.body) // title sub body 
        await data.save()
        res.status(200).send({ "msg": "Data added to Database" })
    } catch (err) {
        res.status(200).send({ "msg": err.message })
    }
})

noteRouter.put("/put/:id",async (req,res)=>{
    let {id}=req.params
    let payload=req.body
    const data=await NoteModel.findByIdAndUpdate({userID:id},payload)
    res.status(200).send(data) 
})
noteRouter.delete("/delete/:id",async (req,res)=>{
    let {id}=req.params
    const data=await NoteModel.findByIdAndDelete({_id:id})
    res.status(200).send(data) 
})
module.exports = noteRouter

