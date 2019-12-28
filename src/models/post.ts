const { model, Schema } = require('mongoose')

const postSchema = new Schema(
  {
    name: String,
    body: String,
    comments: [
      {
        name: String,
        body: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        }
      }
    ],
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        }
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  { timestamps: true }
)

module.exports = model('Post', postSchema)

export {}
