const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    emergency_type: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: null
    },
    proof: {
        type: String,
        default: ""
    },
    status : {
        type : String,
        default:"pending"
    }
},{ timestamps: true })

const requests = mongoose.model("requests", requestSchema)

module.exports = requests