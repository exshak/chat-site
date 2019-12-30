const express = require('express')
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

const mongoURI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI
    : process.env.MONGO_URI_LOCAL

const connect = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('MongoDB Connected')
  } catch (error) {
    console.error(error.message)

    process.exit(1)
  }
}

connect() // Connect to MongoDB

app.use(express.json({ extended: true }))

app.use('/api', require('./routes/users'))
app.use('/api', require('./routes/posts'))

app.listen(port, () =>
  console.log('Server running on http://localhost:%d', port)
)
