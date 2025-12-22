const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        type: {
            type: String,
            enum: ["need", "offering"],
            required: true
        },

        location: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },

        createdBy: {
            type: String,
            required: true
        },
        replies: [
            {
                message: String,
                repliedBy: String,
                createdAt: { type: Date, default: Date.now }
            }
        ]

    },
    { timestamps: true }
);

const Community = mongoose.model("community", communitySchema);
module.exports = Community;
