const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, sanitize, validationResult } = require('express-validator')

const User = require('../models/user')
const secret = process.env.JWT_SECRET

// POST - api/signup - Register user
// prettier-ignore
router.post('/signup', async (req, res) => {
  await check('name', 'Name is required').not().isEmpty().run(req)
  await check('email', 'Email is not valid').isEmail().run(req)
  await check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }).run(req)
  await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ errors: [{ msg: 'Account with that email already exists.' }] })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await new User({ name, email, password: hash }).save()

    const token = await jwt.sign({ id: user.id }, secret, { expiresIn: '1h' })

    return res.status(200).json({ token })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ errors: error.message })
  }
})

// POST - api/signin - Login user
// prettier-ignore
router.post('/signin', async (req, res) => {
  await check('email', 'Email is not valid').isEmail().run(req)
  await check('password', 'Password is required').exists().run(req)
  await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    const token = await jwt.sign({ id: user.id }, secret, { expiresIn: '1h' })

    return res.status(200).json({ token })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ errors: error.message })
  }
})

module.exports = router

export {}
