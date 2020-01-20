import { CircularProgress, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../redux/actions/postActions'
import Post from '../post'
import Profile from '../profile'

const Posts = ({ posts, loading, getPosts }: any) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

  return loading ? (
    <CircularProgress size={200} thickness={2} />
  ) : (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {posts.map((post: object) => (
          // @ts-ignore
          <Post key={post._id} post={post} />
        ))}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = ({ post: { posts, loading } }: any) => ({
  posts,
  loading
})

const mapDispatchToProps = (dispatch: any) => ({
  getPosts: () => dispatch(getPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
