const User=require('../models/userModel');
const {createSecretToken}=require('../middleware/createSecretToken');
const bcrypt=require('bcrypt')
const signUp=async(req,res,next)=>{
    try {
        const {name,email,password,user_type}=req.body;
        if(!name||!email||!password){
            console.log('all feilds required');
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.json({ message: "User already exists" });
        }
        const user = await User.create({ email, password, name,user_type  });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });
        res
          .status(201)
          .json({ message: "User signed in successfully", success: true, user });
        next();
        
    } catch (error) {
       console.log(error,'failed to signUp'); 
    }
}
const login=async(req,res,next)=>{
    try {
        const { email, password} = req.body;
        if(!email || !password ){
          return res.json({message:'All fields are required'})
        }
        const user = await User.findOne({ email });
        if(!user){
          return res.json({message:'Incorrect password or email' }) 
        }
        const auth = await bcrypt.compare(password,user.password)
        if (!auth) {
          return res.json({message:'Incorrect password or email' }) 
        }
         const token = createSecretToken(user._id);
         res.cookie("token", token, {
           withCredentials: true,
           httpOnly: false,
         });
         res.status(201).json({ message: "User logged in successfully", success: true });
         next()
      } catch (error) {
        console.error(error);
      }
}

const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0) // Set the cookie to expire immediately
    });
    res.status(200).json({ message: "User logged out successfully" });
};

module.exports={
    signUp,
    login,
    logout
}