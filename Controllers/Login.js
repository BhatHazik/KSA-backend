const User = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SecretKey = process.env.SECRET_KEY;
const AdminKey = process.env.ADMIN_KEY;
const handleLogin = async(req, res) => {
    try{
        const {username, password} = req.body;
        const isUser = await User.findOne({username}); 
        const isadmin = await User.findOne({username})
        
        if(username !== '' && password !== ''){



            if(username == 'hazik'){
                if(isadmin){

                    const passVerify = await bcrypt.compare(password , isadmin.password);
                if(passVerify){
                    const adminToken = jwt.sign({adminId:isadmin._id, username:isadmin.username},`${AdminKey}`,{
                        expiresIn:'1h'
                    });
                    res.json({message:'admin login detected', adminToken});
                }
                else{
                    res.json({message:'Password Does Not Match'})
                }
                }
                
            }

            else{

            







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

                // if(isadmin){
                //     const adminVerfy = await bcrypt.compare(password, isadmin.password);
                //     if(adminVerfy){
                //         // const token = jwt.sign({userId: isUser._id, username: isUser.username}, `${SecretKey}` , {
                //         //     expiresIn: '1h', 
                //         // });
    
                //         res.status(200).json({ message: 'Admin login detected' });
                //     }
                   
                // }
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