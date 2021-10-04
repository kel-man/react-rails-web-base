import React, { useState, useEffect } from 'react'
import BlogShow from './Show'
import { withRouter, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { CssBaseline, Container, TextField, Typography, List, ListItem, ListItemText, Button } from '@material-ui/core'
import BlogIndex from './BlogIndex'
import BlogCreate from './BlogCreate'

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'left',
    flexFlow: 'column',
  },
})

const Blog = ({ classes, history }) => {
  return (
    <>
      <Container className={classes.container}>
        <Typography>Blogs</Typography>
        <Switch>
          <Route path="/_/blog/create" component={BlogCreate} />
          <Route path="/_/blog/:blogId" component={BlogShow} />
          <Route path="/_/blog" component={BlogIndex} />
        </Switch>
      </Container>
    </>
  )
}

export default withStyles(styles)(withRouter(Blog))
