import React, { useState, useEffect } from 'react'
import { Button, List, ListItem, ListItemText } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import SortBar from './SortBar'

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'left',
    flexFlow: 'column',
  },
})

const changeTimestampFormat = ts => {
  return new Date(ts).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const BlogIndex = ({ classes, history }) => {
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState(0)
  const [sortMethod, setSortMethod] = useState('new')

  useEffect(() => {
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'GET',
      url: '/blogs',
    })
      .then(response => {
        setPosts(response.data.blogs)
        console.log(response.data)
      })
      .catch(error => {})
  }, [])

  return (
    <>
      <Button onClick={() => history.push('/_/blog/create')}>Post New Blog</Button>
      <SortBar sortMethod={sortMethod} setSortMethod={setSortMethod} />
      <List>
        {posts.map(blog => {
          return (
            <ListItem key={blog.title} button onClick={() => history.push(`/_/blog/${blog.id}`)}>
              <ListItemText key={blog.title} primary={blog.title} secondary={changeTimestampFormat(blog.timestamp)} />
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export default withStyles(styles)(withRouter(BlogIndex))
