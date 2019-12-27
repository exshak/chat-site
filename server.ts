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
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error.message)

    process.exit(1)
  }
}

connect() // Connect to MongoDB

app.use(express.json({ extended: true }))

app.get('/', (req, res) => res.send('running'))

app.listen(port, () =>
  console.log('Server is running on http://localhost:%d', port)
)
