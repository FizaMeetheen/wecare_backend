const announcements = require("../model/announcementModel");
const donations = require("../model/donationModel");
const  events  = require("../model/storyModel");



// -------------------volunteer------------------------------------------------

//post-announcements
exports.postAnnouncementController = async (req,res) => {
    console.log('Inside Post Announcement Controller');

    const {announcementType,title,abstract,donationType,amount,quantity,eventDate,eventTime,eventPlace} = req.body
    console.log(announcementType,title,abstract,donationType,amount,quantity,eventDate,eventTime,eventPlace);

    const createdBy = req.payload
    
    try {
        const newAnnouncement = new announcements({
            announcementType,
            title,
            abstract,
            createdBy,
            donationType,
            amount,
            quantity,
            eventDate,
            eventTime,
            eventPlace
        })
        await newAnnouncement.save()
        res.status(200).json(newAnnouncement)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

//get-volunteer announcements
exports.getVolunteerAnnouncements = async (req,res) => {
    console.log('Inside Get Volunteer ANnouncements');
    const createdBy = req.payload
    try {
        const volAnnoucement = await announcements.find({createdBy}).sort({createdAt : -1 })
        res.status(200).json(volAnnoucement)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

//update-announcements
exports.editAnnouncementController = async(req,res) => {
  console.log('Inside Edit Volunteer Announcements');
  const {id} = req.params
  try {
    const updatedData = await announcements.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(updatedData)
  } catch (error) {
    res.status(500).json(error)
  }
  
}

// -------------------USER------------------------------------------------
//get-All Announcements

exports.getAllAnnouncements = async (req, res) => {
  try {
    const email = req.payload || null;

    let announcementsList = await announcements.find({});

    if (email) {
      const userDonations = await donations
        .find({ userMail: email })
        .select("announcementId");

      const userEvents = await events
        .find({ email })
        .select("announcementId");

      const hiddenIds = [
        ...userDonations.map(d => d.announcementId),
        ...userEvents.map(e => e.announcementId)
      ];

      announcementsList = announcementsList.filter(
        a => !hiddenIds.includes(a._id.toString())
      );
    }

    res.status(200).json(announcementsList);
  } catch (error) {
    res.status(500).json(error);
  }
};



// getSingleAnnouncementController By id
exports.getSingleAnnouncementController = async (req, res) => {
    const {id} = req.params
  try {
    const announcement = await announcements.findById(id);
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json(error);
  }
};

//---------ADMIN-------------------
//delete-stories
exports.deleteAnnouncementController = async(req,res) => {
    console.log('inside delete Announcement controller');
    const {id} = req.params
    try {
        const deleteAnnouncements = await announcements.findByIdAndDelete(id)
        res.status(200).json(deleteAnnouncements)
    } catch (error) {
        res.status(500).json(error)
    }
}
