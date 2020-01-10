const jwt = require('jsonwebtoken')

const User = require('../models/user')
const secret = process.env.JWT_SECRET

const auth = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(400).json({ msg: 'Authentication token is required' })
  }

  const accessToken = token.split(' ')[1]

  try {
    const decoded = await jwt.verify(accessToken, secret)
    if (!decoded) {
      return res.status(400).json({ msg: 'Invalid token' })
    }

    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    req.user = user

    next()
  } catch (error) {
    console.error(error.message)
    res.status(500).send({ errors: error.message })
  }
}

module.exports = auth
