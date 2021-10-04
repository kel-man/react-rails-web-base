import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Typography, TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

const styles = theme => ({})

const CommentBox = ({ classes, history, match }) => {
  const [comment, setComment] = useState({})
  const [commentList, setCommentList] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'GET',
      url: `/blog_comments/${match.params.blogId}`,
    })
      .then(response => {
        console.log(response.data)
        setCommentList(response.data.blogComments)
      })
      .catch(error => {})
  }, [])

  const handleChange = e => {
    setComment({ ...comment, newComment: e.target.value })
  }

  const editComment = () => {
    setEditing(1)
  }

  const sendComment = () => {
    data = { blogComment: {
      comment,
    } }
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'POST',
      url: `/blog_comments/${match.params.blogId}`,
      data,
    })
      .then(response => {
        console.log(response.data)
        setRefresh(refresh+1)
        setEditing(null)
      })
  }

  return (
    <>
      <TextField label={'New comment'}/>
      <Button>Post</Button>
      {commentList.map(c => {
        return (
          <>
            {c.editable && <Button onClick={editComment}>Edit</Button>}
            {editing && (
              <>
                <TextField value={c.comment} />
                <Button onClick={sendComment} label={'Save'} />
              </>
            )}
            {!editing && (
              <>
                <Typography>{comment.comment}</Typography>
              </>
            )}
          </>
        )
      })}
      <TextField value={comment} onChange={handleChange} />
    </>
  )
}

export default withStyles(styles)(withRouter(CommentBox))
