const users = require("../model/userModel")
const jwt = require("jsonwebtoken")


//register
exports.registerController = async (req, res) => {
    console.log('Inside Register Controller');

    const { username, email, password, role } = req.body
    console.log(username, email, password);

    //logic
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(404).json("User Already Exists...Please login!!")
        } else {
            const newUser = new users({
                username,
                email,
                password,
                role
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//login
exports.loginController = async (req, res) => {
    console.log('Inside Login Controller');

    const { email, password } = req.body
    console.log(email, password);

    //logic
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email, role: existingUser.role }, process.env.JWTSecretKey)
                res.status(200).json({ existingUser, token })
            }
            else {
                res.status(400).json("Invalid Credentials")
            }
        } else {
            res.status(404).json("User not found..Please register!!")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

//googlelogin
exports.googleLoginController = async (req, res) => {
    console.log('Inside Google Login Controller');

    const { email, password, username, profile, role } = req.body
    console.log(email, password, username, profile, role);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ userMail: existingUser.email, role: existingUser.role }, process.env.JWTSecretKey)
            console.log(token);
            res.status(200).json({ existingUser, token })
        }
        else {
            const newUser = new users({
                username,
                email,
                password,
                profile,
                role: role || "user"
            })
            await newUser.save()
            const token = jwt.sign({ userMail: newUser.email, role: newUser.role }, process.env.JWTSecretKey)
            console.log(token);
            res.status(200).json({ existingUser: newUser, token })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

//edit-profile
exports.editProfileCOntroller = async (req, res) => {
    console.log("Inside Edit Profile Controller");

    const { username, phone, address, oldPassword, password } = req.body;
    const email = req.payload; // from JWT

    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json("user not found..try again");
        }

        // Password check
        if (password && existingUser.password !== oldPassword) {
            return res.status(400).json("Incorrect password");
        }

        const updateProfile = req.file
            ? req.file.filename
            : existingUser.profile;

        const updatedData = {
            username,
            phone,
            address,
            profile: updateProfile,
            password: password ? password : existingUser.password
        };

        const editProfile = await users.findByIdAndUpdate(
            existingUser._id,
            updatedData,
            { new: true }
        );

        res.status(200).json(editProfile);

    } catch (error) {
        res.status(500).json(error);
    }
};



//Admin

//get-users
exports.getUsersController = async (req, res) => {
    console.log('Inside get users controller');
    try {
        const allUsers = await users.find({role:"user"})
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json(error)
    }
}

//delete-users
exports.deleteUsersController = async(req,res) => {
    console.log('inside delete user controller');
    const {id} = req.params
    try {
        const deletedUser = await users.findByIdAndDelete(id)
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

//get-volunteers
exports.getVolunteersController = async (req, res) => {
    console.log('Inside get volunteer controller');
    try {
        const allVolunteers = await users.find({role:"volunteer"})
        res.status(200).json(allVolunteers)
    } catch (error) {
        res.status(500).json(error)
    }
}

//delete-volunteer
exports.deleteVolunteerController = async(req,res) => {
    console.log('inside delete Volunteer controller');
    const {id} = req.params
    try {
        const deletedVolunteer = await users.findByIdAndDelete(id)
        res.status(200).json(deletedVolunteer)
    } catch (error) {
        res.status(500).json(error)
    }
}