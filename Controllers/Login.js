const User = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SecretKey = process.env.SECRET_KEY;

const handleLogin = async(req, res) => {
    try{
        const {username, password} = req.body;
        const isUser = await User.findOne({username}); 

        if(username !== '' && password !== ''){
            if(isUser){
                const passVerify = await bcrypt.compare(password , isUser.password);
                if (passVerify) {
                 
                    const token = jwt.sign({userId: isUser._id, username: isUser.username}, `${SecretKey}` , {
                        expiresIn: '1h', 
                    });

                    res.status(200).json({ message: 'Login success' , token});
                }
                else{
                    res.json({ message: 'Password Does Not Match'});
                }

            }
            else{
                res.json({message:'user not exists please signup first'});
            }
        }
        else{
            res.json({message:'please fill all feilds'});
        }
    }

    catch(error){
        console.log(error);
    }
};


module.exports = handleLogin;