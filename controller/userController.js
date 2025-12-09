const users = require("../model/userModel")

//register
exports.registerController = async (req, res) => {
    console.log('Inside Register Controller');

    const { username, email, password } = req.body
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
                password
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
                res.status(200).json(existingUser)
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