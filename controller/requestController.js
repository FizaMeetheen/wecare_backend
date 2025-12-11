const requests = require("../model/requestModel");


//requests-emergency
exports.emergencyRequestController = async (req, res) => {
    console.log('inside Emergency request Controller');

    const { fullname, phone, location, emergency_type, abstract } = req.body
    console.log(fullname, phone, location, emergency_type, abstract);

    try {
        const newRequest = new requests({
            fullname,
            phone,
            location,
            emergency_type,
            abstract
        })
        await newRequest.save()
        res.status(200).json(newRequest)
    } catch (error) {
        res.status(500).json(error)
    }



}
