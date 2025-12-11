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
    console.log("Inside Edit Profile COntroller");
    const { username, email, phone, address, oldPassword, password } = req.body
    const existingUser = await users.findOne({ email })
    if (!existingUser) {
        return res.status(404).json("user not found..try again")
    }

    if (password) {
        if (existingUser.password != oldPassword) {
           return res.status(400).json("Incorrect password")
        }
    }
    const updateProfile = req.file ? req.file.filename : existingUser.profile
    const updatedData = {
        username,
        phone,
        address,
        profile: updateProfile
    }
    if (password) {
        updatedData.password = password
    }
    else {
        updatedData.password = existingUser.password
    }
    try {
        const editProfile = await users.findOneAndUpdate({ email }, updatedData, { new: true })
        res.status(200).json(editProfile)
    } catch (error) {
        res.status(500).json(error)
    }

}