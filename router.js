const express = require("express")
const { registerController, loginController, googleLoginController, editProfileCOntroller, getUsersController, deleteUsersController, getVolunteersController, deleteVolunteerController } = require("./controller/userController")
const jwtMiddleware = require("./middleware/jwtMiddleware")
const { emergencyRequestController, getAllEmergencyRequests, acceptRequestsController} = require("./controller/requestController")
const {makeDonationController, getAllDonationController, createCheckoutSession} = require("./controller/donationController")
const upload = require("./middleware/imageMulterMiddleware")
const { eventRegisterController, getAllEventsController } = require("./controller/EventController")
const { shareStoryController, getAllStoriesController, deleteStoriesController } = require("./controller/storyController")
const { postAnnouncementController, getVolunteerAnnouncements, getAllAnnouncements, getSingleAnnouncementController, editAnnouncementController, deleteAnnouncementController } = require("./controller/announcementController")
const { postController, getAllPostsControlller, addReplyController } = require("./controller/communityController")
const { addBlogsController, getAllBlogsController, deleteBlogsController, editBlogController } = require("./controller/blogsContoller")

const router = express.Router()

//register
router.post("/register",registerController)

//login
router.post("/login",loginController)

//google-login
router.post("/google-login",googleLoginController)

//emergency-request
router.post("/emergency",upload.single("proof"),emergencyRequestController)

//edit-profile
router.put("/edit-profile",jwtMiddleware,upload.single("profile"),editProfileCOntroller)

//stripe-money donation
router.post("/create-checkout-session",jwtMiddleware,createCheckoutSession);

//make-donation
router.post("/make-donation/:id",jwtMiddleware,makeDonationController)

//register-event
router.post("/event-registration/:id",jwtMiddleware,eventRegisterController)

//share-story
router.post("/share-story",jwtMiddleware,shareStoryController)

//get-stories
router.get("/get-allstories",getAllStoriesController)

//get-donations
router.get("/get-alldonations",jwtMiddleware,getAllDonationController)

//get-events
router.get("/get-allevents",jwtMiddleware,getAllEventsController)


//get-allannouncements
router.get("/get-allannouncements",jwtMiddleware,getAllAnnouncements)

//get-single announcement
router.get("/get-announcement/:id", getSingleAnnouncementController);


//---------volunteer------------------

//post-announcements
router.post("/post-announcements",jwtMiddleware,postAnnouncementController)

//get-vol announcements
router.get("/get-announcements",jwtMiddleware,getVolunteerAnnouncements)

//get-requests
router.get("/get-allrequests",jwtMiddleware,getAllEmergencyRequests)

//accept-requests
router.put("/accept-requests/:id",jwtMiddleware,acceptRequestsController)

//edit-announcements
router.put("/update-announcement/:id",jwtMiddleware,editAnnouncementController)

//create-post
router.post("/create-post",jwtMiddleware,postController)

//get-allposts
router.get("/get-allposts",jwtMiddleware,getAllPostsControlller)

//reply
router.put("/community-reply/:id", jwtMiddleware, addReplyController);

//-----------------ADMIN-------------------------------

//get-users
router.get("/get-users",jwtMiddleware,getUsersController)

//delete-user
router.delete("/remove-users/:id",jwtMiddleware,deleteUsersController)

//get-volunteers
router.get("/get-volunteers",jwtMiddleware,getVolunteersController)

//delete-volunteers
router.delete("/remove-volunteers/:id",jwtMiddleware,deleteVolunteerController)

//delete-stories
router.delete("/delete-stories/:id",jwtMiddleware,deleteStoriesController)

//delete-Announcements
router.delete("/delete-announcements/:id",jwtMiddleware,deleteAnnouncementController)

//add-blogs
router.post("/add-blogs",jwtMiddleware,addBlogsController)

//get-allblogs
router.get("/get-allblogs",jwtMiddleware,getAllBlogsController)

//delete-blogs
router.delete("/delete-blogs/:id",jwtMiddleware,deleteBlogsController)

//edit-blog
router.put("/edit-blogs/:id",jwtMiddleware,editBlogController)

module.exports = router