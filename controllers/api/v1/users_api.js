const User=require('../../../models/users');
const jwt=require('jsonwebtoken');
const env=require('../../../config/environment');




//sign in and create session for user
module.exports.createSession=async function(req,res){
    try {
        let user= await User.findOne({email: req.body.email});
        if(!user || user.password!= req.body.password){
            return res.json(422,{
                message:'Invalid username|password'
            });

        }
        return res.json(200,{
            message:'SignIn successfull, Here is your token keep it safe',
            data:{
                token:jwt.sign(user.toJSON(),env.jwt_secret,{ expiresIn:'100000'})
            }
        });
    } catch (err) {
        console.log('***Error***',err);
        return res.status(500).json({
            message:'Internal Server Error',
        });
    }
    

}
