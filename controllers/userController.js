const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//Todo:Create new post

exports.registerUsers = async (req, res) => {
    try {

        const user = await User.findOne({

            $or: [{ email: req.body.email }, { username: req.body.username }]
        });
        if (user) {
            res.status(409).json({ message: "user already exists" })
        }
        const salt = await bcrypt.genSalt(12); //random numbers
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await User.create({
            fullName: req.body.fullName,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(201).json({ message: "User added successfuly", data: newUser });

    } catch (error) {
        console.log(error);
    }

};