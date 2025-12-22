const mongoose = require("mongoose")

const storySchema = new mongoose.Schema({
    email : {
        type:String,
        required:true
    },
    name : {
        type :String,
        required : true
    },
    title : {
        type:String,
        required : true
    },
    story : {
        type:String,
        required:true
    }
})

const stories = mongoose.model("stories",storySchema)
module.exports = stories