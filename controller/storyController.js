const stories = require("../model/storyModel");


//register-event
exports.shareStoryController = async(req,res) => {
    console.log('Inside Share Story controller');

    const {name,title,story} = req.body
    const email = req.payload

    try{
        const newStory = new stories({
            name,
            title,
            email,
            story
        })
        await newStory.save()
        res.status(200).json(newStory)
    }
    catch(error){
        res.status(500).json(error)
    }


    
}

//get-stories
exports.getAllStoriesController = async (req,res) => {
    console.log('inside get Story controller');
    try {
        const allStories = await stories.find()
        res.status(200).json(allStories)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

//.-------------ADMIN------------------

//delete-stories
exports.deleteStoriesController = async(req,res) => {
    console.log('inside delete Story controller');
    const {id} = req.params
    try {
        const deletedStory = await stories.findByIdAndDelete(id)
        res.status(200).json(deletedStory)
    } catch (error) {
        res.status(500).json(error)
    }
}