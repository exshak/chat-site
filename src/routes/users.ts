const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, sanitize, validationResult } = require('express-validator')
const auth = require('../utils/auth')

const User = require('../models/user')
const secret = process.env.JWT_SECRET
const expiresIn = process.env.JWT_EXPIRATION

// prettier-ignore
// POST - api/signup - Register user
router.post('/signup', async (req, res) => {
  await check('email', 'Email is not valid').isEmail().run(req)
  await check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }).run(req)
  await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ errors: [{ msg: 'Account with that email already exists.' }] })
    }

    const hash = bcrypt.hashSync(password, 10)

    const user = await new User({ email, password: hash }).save()

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn })

    return res.status(200).json({ token })
  } catch (error) {
    console.error(error.message)
    res.status(500).send({ errors: error.message })
  }
})

// prettier-ignore
// POST - api/signin - Login user
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
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn })

    return res.status(200).json({ token })
  } catch (error) {
    console.error(error.message)
    res.status(500).send({ errors: error.message })
  }
})

// prettier-ignore
// POST - api/profile - Update profile
router.post('/profile', auth, async (req, res) => {
  await check('email', 'Email is not valid').isEmail().run(req)
  await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const user = req.user
  const { email, name, about, picture, location } = req.body

  try {
    if (user.email !== email) {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ errors: [{ msg: 'Email has already been taken.' }] })
      }
    }

    await user.set({ email, profile: { name, about, picture, location } }).save()

    return res.status(200).json({ user })
  } catch (error) {
    console.error(error.message)
    res.status(500).send({ errors: error.message })
  }
})

module.exports = router

export {}
