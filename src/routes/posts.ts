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

  const user = req.user
  const { name, body } = req.body

  try {
    const post = await new Post({ name, body, user }).save()

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

module.exports = router

export {}
