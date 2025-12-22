const requests = require("../model/requestModel");


//requests-emergency
exports.emergencyRequestController = async (req, res) => {
    console.log('inside Emergency request Controller');

    const { fullname, phone, location, emergency_type, abstract , amount , status  } = req.body
    console.log(fullname, phone, location, emergency_type, abstract , amount , status);
    const uploadedProof = req.file ? req.file.filename : ""
    try {
        const newRequest = new requests({
            fullname,
            phone,
            location,
            emergency_type,
            abstract,
            amount : emergency_type === "Medical Emergency" ? amount : null,
            proof : uploadedProof,
            status 
        })
        await newRequest.save()
        res.status(200).json(newRequest)
    } catch (error) {
        res.status(500).json(error)
    }

}

//get-requests
exports.getAllEmergencyRequests = async (req,res) => {
    console.log('inside get all requests controller');
    try {
        const allRequests = await requests.find()
        res.status(200).json(allRequests)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

//accept-requests
exports.acceptRequestsController = async (req,res) => {
    console.log('inside accept controller');
    const {status} = req.body
    const {id} = req.params
    
    try {
        
        const acceptRequests = await requests.findByIdAndUpdate(id,{$set : {status  }} , {new:true})
        res.status(200).json(acceptRequests)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

