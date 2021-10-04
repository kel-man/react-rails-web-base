import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { ListItem, Container, Box, Typography, TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import AuthContext from '../../../AuthContext'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import ForumIcon from '@material-ui/icons/Forum'

const styles = theme => ({
  commentList: {
    display: 'flex',
    flexFlow: 'column',
  },
  eachComment: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    paddingBottom: '10px',
  },
  commentInput: {},
  postCommentButton: {},
  editButton: {
    display: 'flex',
  },
})

const CommentBox = ({ classes, history, match }) => {
  const [comment, setComment] = useState({newComment: ''})
  const [commentList, setCommentList] = useState([])
  const [editing, setEditing] = useState(null)
  const [refresh, setRefresh] = useState(0)
  const [editedComment, setEditedComment] = useState({comment: ''})
  const authContext = useContext(AuthContext)

  useEffect(() => {
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'GET',
      url: `/blog_comments/?blog_id=${match.params.blogId}`,
    })
      .then(response => {
        console.log(response.data)
        setCommentList([...response.data.blogComments])
        console.log(editing)
      })
      .catch(error => {})
  }, [refresh])

  const handleChange = e => {
    const { key, value } = e.target
    setComment({ ...comment, newComment: value })
  }

  const handleEdit = e => {
    const { key, value } = e.target
    setEditedComment({ ...editedComment, comment: value})
  }

  const editComment = ({c}) => {
    setEditing(c.id)
    setEditedComment({ ...editedComment, comment: c.comment })
  }

  const saveEdit = (id) => {
    const data = { blog_comment: {
      comment: editedComment.comment,
    } }
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'PATCH',
      url: `/blog_comments/${id}`,
      data,
    })
      .then(response => {
        console.log(response.data)
        setRefresh(refresh+1)
        setEditing(null)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const sendComment = () => {
    const data = { blog_comment: {
      comment: comment.newComment,
      blog_id: match.params.blogId,
    } }
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'POST',
      url: '/blog_comments/',
      data,
    })
      .then(response => {
        console.log(response.data)
        setRefresh(refresh+1)
        setComment({...comment, newComment: ''})
      })
  }

  return (
    <>
      <Container className={classes.commentList}>
      <TextField inputProps={{ 'data-testid': 'new-comment' }} className={classes.commentInput} label="New comment..." value={comment.newComment} onChange={handleChange} />
      <Button onClick={() => sendComment()} label={'New'} className={classes.postCommentButton}>Post New Comment</Button>
        {commentList.map(c => {
          return (
            <div key={c.id}>
              <Container className={classes.eachComment}>
                <ListItem button className={classes.eachComment}>
                {editing == c.id && (
                  <>
                    <TextField value={editedComment.comment} onChange={handleEdit}/>
                    <Button onClick={() => saveEdit(c.id)} label={'Save'} >Save Comment</Button>
                  </>
                )}
                {!(editing == c.id) && (
                  <>
                    <Typography>{c.comment}</Typography>
                  </>
                )}
                {c.owner == authContext.username && <BorderColorIcon className={classes.editButton} onClick={() => editComment({c})}/>}
                </ListItem>
              </Container>
            </div>
          )
        })}
      </Container>
    </>
  )
}

export default withStyles(styles)(withRouter(CommentBox))
