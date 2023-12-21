const User = require('../models/userModels')
const jwt = require('jsonwebtoken')

const registerController = async (req, res, next) => {
  const { user_id, email, password } = req.body;

  if (!email || !password || !user_id) {
    return res.status(400).json({
      success: false,
      msg: 'All fields are mandatory',
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    const existingUserID = await User.findOne({ user_id });


    if (existingUser || existingUserID) {
      return res.status(400).json({
        success: false,
        msg: 'Email or USER_ID already taken',
      });
    }

   

    const user = await User.create({
      user_id,
      email,
      password
    });

    await user.save();
    res.status(201).json({
      success: true,
      msg: 'User created successfully',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: 'Server error',
    });
  }
};

const loginController = async(req,res,next)=>{
    const { email , password} = req.body
    
    if (!email || !password ) {
        return res.status(401).json({ msg: 'all fields are mandatory' });
    }


    try{
    const user = await User.findOne({email})

     if(user && password == user.password){

            const accessToken = jwt.sign({
                user:{
                    user_id : user.user_id,
                    email : user.email,
                }
            },process.env.SECRET,{expiresIn:'2d'})

            res.status(200).json({accesstoken:accessToken})
        }
        else{
                throw new Error('wrong credentials')
        }
    }catch(err){
        return res.status(400).json({msg:err.message})
    }
}

module.exports = {registerController,loginController}

//add bycrypt 