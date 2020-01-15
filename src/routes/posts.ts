const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const auth = require('../utils/auth')

const Post = require('../models/post')
const User = require('../models/user')

// prettier-ignore
// POST - api/posts - Create post
router.post('/posts', auth, async (req, res) => {
  await check('body', 'Text is required').not().isEmpty().run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id: user, profile: { name, image } } = req.user
  const { body, title } = req.body

  try {
    const post = await new Post({ name, body, image, title, user }).save()

    return res.status(200).json({ post })
  } catch (error) {
    console.error(error.message)
    res.status(500).send({ errors: error.message })
  }
})

// prettier-ignore
// DELETE - api/posts/:id - Delete post
router.delete('/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(400).json({ errors: [{ msg: 'Post not found' }] })
    }

    if (post.user.toString() !== req.user) {
      return res.status(400).json({ errors: [{ msg: 'User not authorized' }] })
    }

    await post.remove()

    return res.status(200).json({ msg: 'Post removed' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send({ errors: error.message })
  }
})

// GET - api/posts - All posts
router.get('/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })

    res.json(posts)
  } catch (error) {
    console.error(error.message)
    res.status(500).send({ errors: error.message })
  }
})

// GET - api/posts/:id - Single post
router.get('/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(400).json({ errors: [{ msg: 'Post not found' }] })
    }

    res.json(post)
  } catch (error) {
    console.error(error.message)
    res.status(500).send({ errors: error.message })
  }
})

module.exports = router

export {}
