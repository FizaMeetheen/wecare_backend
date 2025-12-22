const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    announcementId: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    pickup_location: {
        type: String,
        default: ""
    },
    notes: {
        type: String,
        default: ""
    },
})

const events = mongoose.model("events", eventSchema)
module.exports = events