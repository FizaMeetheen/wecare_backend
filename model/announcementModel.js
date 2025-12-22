const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
    {
        announcementType: {
            type: String,
            enum: ["donation", "event"],
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
        createdBy: {
            type: String,
            required: true
        },

        donationType: {
            type: String
        },
        amount: {
            type: Number
        },
        quantity: {
            type: String
        },

        eventDate: {
            type: String
        },
        eventTime: {
            type: String
        },
        eventPlace: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        }
    })

const announcements = mongoose.model("announcements", announcementSchema);
module.exports = announcements;
