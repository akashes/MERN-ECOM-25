import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Please enter your name'],
        maxLength:[25,'Invalid name. Please enter a name with less than 25 characters'],
        minLength:[3,'Name should contain more than 3 characters']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minLength:[8,'Password should contain more than 8 characters'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date

},{timestamps:true})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}
userSchema.methods.verifyPassword =async function(userEnteredPassword){
    return await bcrypt.compare(userEnteredPassword,this.password)

}
const User = mongoose.model('User',userSchema)
export default User