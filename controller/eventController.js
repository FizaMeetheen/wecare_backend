const announcements = require("../model/announcementModel");
const events = require("../model/eventModel");

//register-event
exports.eventRegisterController = async (req, res) => {
    console.log('Inside event register controller');

    const { fullname, phone , pickup_location, notes } = req.body
    const email = req.payload
    const { id } = req.params;

    try {
        const announcement = await announcements.findById(id);
        if (!announcement || announcement.announcementType !== "event") {
            return res.status(404).json("Invalid event announcement");
        }
        const newEvent = new events({
            announcementId: id,
            title : announcement.title,
            abstract : announcement.abstract,
            fullname,
            phone,
            email,
            event: announcement.title,
            pickup_location,
            notes
        })
        await newEvent.save()
        res.status(200).json(newEvent)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

//get-events
exports.getAllEventsController = async (req, res) => {
    console.log('inside get events controller');
    const email = req.payload
    try {
        const allEvents = await events.find({ email })
        res.status(200).json(allEvents)

    } catch (error) {
        res.status(500).json(error)
    }

}