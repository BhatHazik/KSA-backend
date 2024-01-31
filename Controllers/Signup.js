const User = require("../Models/UserModel")
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {

    try{
        const { username, password } = req.body;


        
        const existingUser = await User.findOne({ username });

        if (username !== "" && password !== "") {
            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ username, password: hashedPassword });
                await newUser.save();
                res.status(201).json({ message: 'User created successfully'});
            } else {
                res.status(200).json({ message: 'User already exists'});
            }
        }
        else {
            res.status(200).json({ message: 'All credentials required'});
        }
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = handleRegister;