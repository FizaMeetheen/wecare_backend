
// 1.import express
const express = require("express")

//2.import cors
const cors = require("cors")

//3.import dotenv
require("dotenv").config()

//import router
const router = require("./router")

//10.import connection file
require("./db/connection")

// 4.create server
const weCareServer = express()

// 5.use cors in server
weCareServer.use(cors())

//6.use middleware
weCareServer.use(express.json())

//imguploads
weCareServer.use("/imageUploads",express.static("./imageUploads"))

// use router
weCareServer.use(router)

// 7. create port
const PORT = 3000

//9.get request to server
weCareServer.get("/",(req,res)=>{
    res.status(200).send(`WeCare server started running successfully and waiting for client request..`)
})

// 8.server started using listen
weCareServer.listen(PORT,()=>{
    console.log(`WeCare Server Started Successfully at : ${PORT}`);  
})

