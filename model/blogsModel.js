const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Safety & Awareness",
        "Emergency Preparedness",
        "Health & Wellbeing",
        "Guides & Resources",
        "Success Stories",
        "Volunteer Experiences",
        "Community Updates",
        "Others",
      ],
    },

    imageUrl: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
      maxlength: 300,
    },

    content: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const blogs = mongoose.model("blogs", blogSchema);
module.exports = blogs;
