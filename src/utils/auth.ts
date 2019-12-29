const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

const auth = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(400).json({ msg: 'Authentication token is required' })
  }

  try {
    const user = await jwt.verify(token, secret)

    req.user = user

    next()
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ errors: error.message })
  }
}

module.exports = auth
