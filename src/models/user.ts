const { model, Schema } = require('mongoose')

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true
    },
    password: String,
    profile: {
      name: String,
      about: String,
      picture: String,
      location: String
    }
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)

export {}
