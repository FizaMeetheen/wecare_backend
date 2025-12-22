const blogs = require("../model/blogsModel");

//add-blogs
exports.addBlogsController = async (req, res) => {
    console.log('inside add blogs controller');
    try {
        const { title, category, imageUrl, shortDescription, content } = req.body
        console.log(title, category, imageUrl, shortDescription, content);
        const createdBy = req.payload
        const newBlog = await blogs({
            title,
            category,
            imageUrl,
            shortDescription,
            content,
            createdBy
        })
        await newBlog.save()
        res.status(200).json(newBlog)
    } catch (error) {
        res.status(500).json(error)
    }

}

//get-allblogs
exports.getAllBlogsController = async (req, res) => {
    console.log('inside get all blogs controller');
    try {
        const allBlogs = await blogs.find()
        res.status(200).json(allBlogs)
    } catch (error) {
        res.status(500).json(error)
    }

}

//delete-blogs
exports.deleteBlogsController = async (req, res) => {
    console.log('inside delete blogs controller');
    const { id } = req.params
    try {
        const deletedBlog = await blogs.findByIdAndDelete(id)
        res.status(200).json(deletedBlog)
    } catch (error) {
        res.status(500).json(error)
    }
}

//edit-blogs
exports.editBlogController = async (req, res) => {
    console.log('inside edit blog controller');
    const { id } = req.params
    const { title, category, imageUrl, shortDescription, content } = req.body
    console.log(title, category, imageUrl, shortDescription, content);
    const createdBy = req.payload
    try {
        const updatedBlog = await blogs.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(updatedBlog)
    } catch (error) {
        res.status(500).json(error)
    }

}

