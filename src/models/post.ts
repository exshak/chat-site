const { model, Schema } = require('mongoose')

const postSchema = new Schema(
  {
    name: String,
    body: String,
    image: String,
    title: String,
    comments: [
      {
        name: String,
        body: String,
        image: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        createdAt: Date
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
