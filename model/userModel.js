//import mongoose
const mongoose = require("mongoose")

//create schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "user"
    }
})

//create model using schema
const users = mongoose.model("users", userSchema)
module.exports = users