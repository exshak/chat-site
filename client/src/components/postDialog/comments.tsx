import { Grid, Typography, withStyles } from '@material-ui/core'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { commentStyles } from './styles'

const Comments = ({ comments, classes }: any) => (
  <Grid container>
    {comments &&
      comments.map(
        ({ _id, name, body, image, user, createdAt }: any, index: number) => (
          <Fragment key={_id}>
            <Grid item sm={12}>
              <Grid container className={classes.container}>
                <Grid item sm={2}>
                  <img
                    src={image}
                    alt='comment'
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant='h5'
                      color='primary'
                      component={Link}
                      to={`/users/${user}`}
                    >
                      {name}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant='body1'>{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        )
      )}
  </Grid>
)

Comments.propTypes = {
  comments: PropTypes.array,
  classes: PropTypes.object.isRequired
}

export default withStyles(commentStyles)(Comments)
