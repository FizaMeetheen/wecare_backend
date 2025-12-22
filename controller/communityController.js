const Community = require("../model/communityModel");

//create-post
exports.postController = async(req,res) => {
    console.log('inside create post Controller');
    
    const {title,description,type,location,phone} = req.body
    const createdBy = req.payload

    try {
        const newPosts = new Community({
            title,
            description,
            type,
            location,
            phone,
            createdBy
        })
        await newPosts.save()
        res.status(200).json(newPosts)
    } catch (error) {
        res.status(500).json(error)
    }

}

//get-events
exports.getAllPostsControlller = async (req, res) => {
    console.log('inside get all posts controller');
    try {
        const allPosts = await Community.find().sort({ createdAt: -1 });
        res.status(200).json(allPosts)

    } catch (error) {
        res.status(500).json(error)
    }

}

// reply
exports.addReplyController = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const repliedBy = req.payload;

  try {
    const updatedPost = await Community.findByIdAndUpdate(
      id,
      {
        $push: {
          replies: { message, repliedBy }
        }
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete-stories
exports.deleteCommunityController = async(req,res) => {
    console.log('inside delete community controller');
    const {id} = req.params
    try {
        const deletedCommunity = await Community.findByIdAndDelete(id)
        res.status(200).json(deletedCommunity)
    } catch (error) {
        res.status(500).json(error)
    }
}