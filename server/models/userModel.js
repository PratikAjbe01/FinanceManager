const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    ,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    user_type:{
        type:String,
        required:true,
        enum:['admin','user']
    }
},{
timestamps:true
});
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
const User=mongoose.model('User',userSchema);
module.exports=User;