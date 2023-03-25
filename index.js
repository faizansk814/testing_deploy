const express=require('express')
const connection=require("./connection/db")
require('dotenv').config()
const userRouter=require("./route/user.router")
const noteRouter=require("./route/note.router")
const auth=require("./middleware/auth")
const cors=require('cors')


const app=express()
app.use(cors())
app.use(express.json())

app.use("/user",userRouter)
app.use(auth)

app.use("/note",noteRouter)



app.listen(process.env.port,async()=>{
    await connection
    console.log("connected to db")
})