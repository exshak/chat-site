// import Grid from '@material-ui/core'
import { Grid } from '@material-ui/core'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}></Grid>
        <Grid item sm={4} xs={12}></Grid>
      </Grid>
    </div>
  )
}

export default HomePage
