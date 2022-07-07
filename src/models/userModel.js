const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    picProfile: {type: String},
    idPicProfile: {type: String},
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token:{
      type:String,
      default:''
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)