const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type : String,
        lowercase : true
    },
      lastName:{
        type : String,
        lowercase : true
    },
      email: {
        type : String,
        lowercase : true
    },
      nin: {
        type : String,
        uppercase : true
    },
      passWord: {
        type : String,
    },
      phone: {
        type : String,
    },
      streetAddress: {
        type : String,
        lowercase : true
    },
      state:{
        type : String,
        lowercase : true
    },
      lga:{
        type : String,
        lowercase : true
    },
},{timestamps: true})

let saltRound = 5

userSchema.pre('save',function(next){
bcrypt.hash(this.passWord,saltRound,(err,hashedPassword)=>{
        if (err) {
            console.log(err);
        }
        else{
            this.passWord = hashedPassword
            next()
        }
    })
})



userModel = mongoose.model('signup_table',userSchema)
module.exports = userModel