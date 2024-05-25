const User=require('../models/userModel');
const getAlluser=async(req,res)=>{
    try {
        const users=(await User.find()).filter((user)=>user.user_type!=='admin');
        res.status(200).json({users:users});
    } catch (error) {
        res.status(500).json({message:'cant get al user',sucess:'false'})
    }
}
module.exports=getAlluser