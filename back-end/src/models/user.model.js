import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const accountSchema = new mongoose.Schema({
    // personal info
    username:{type:String, required:true},
    password:{type:String, required:true, select:false},

    status: {
        type: String,
        enum: ["Active", "Blocked", "Deleted"],
        default: "Active"
    },

    // roles
    role:{
        type:String,
        enum: ["Admin", "User"],
        default: "User"
    }, 

    fullName: { type: String },
    age: { type: String },
    country: { type: String },
    gender: { type: String, enum: ["Male", "Female"] },
    
    // profile picture
    profilePicture: {
        url: { type: String },
        public_id: { type: String }
    },
    


}, { timestamps: true })

accountSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

accountSchema.index({username:1,createdAt:-1})

const User = mongoose.model('User', accountSchema)
export default User