const User = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SecretKey = process.env.SECRET_KEY;



const handleLogin = async (req, res) =>{
    try{
        const{username, password} = req.body;
        const isUser = await User.findOne(username);

        if(username !== '' , password !== ''){
            if(isUser){
                const passwordVerify = bcrypt.compare(password, isUser.password);
                if(passwordVerify){
                    const token = jwt.sign({UserId: isUser._id , username:isUser.username}, `${SecretKey}`, {
                        expiresIn:'1h'
                    });
                    res.status(200).json({message: 'Login success', token});
                }
                else{
                    res.json({message: 'password does not match'})
                }
            }
            else{
                res.json({message:'user not found'});
            }
        }
        else{
            res.json({message:'all feilds required'});
        }
    }
    catch(error){
        console.log(error);

    }
}

module.exports = handleLogin;