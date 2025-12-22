const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema({
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
    userMail: {
        type: String,
        required: true
    },
    donationType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: null
    },
    quantity: {
        type: String,
        default: null
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

const donations = mongoose.model("donations", donationSchema)
module.exports = donations