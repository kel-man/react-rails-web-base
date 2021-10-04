import React, { useState, useEffect, useContext } from 'react'
import CommentBox from './CommentBox'
import { Avatar, Container, Typography, Button, Modal } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import ReactQuill from 'react-quill'
import AuthContext from '../../AuthContext'
import 'react-quill/dist/quill.bubble.css'

const styles = theme => ({
  blogTitle: {
    paddingLeft: '40px',
  },
  blogContents: {
    paddingTop: '15px',
    paddingBottom: '30px',
  },
  commentContainer: {},
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalStyle: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    alignSelf: 'flex-start',
    height: '130px',
    width: '120px',
  },
  header: {
    display: 'flex',
    flexFlow: 'row',
  },
  credit: {
    alignSelf: 'flex-end',
    paddingBottom: '15px',
  },
  blogParagraph: {},
})

const formatDate = ts => {
  return new Date(ts).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const BlogShow = ({ classes, history, match }) => {
  const authContext = useContext(AuthContext)
  const [blog, setBlog] = useState({
    owner: 'Null', // so that the empty avatar key does not crash the render
  })
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  useEffect(() => {
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'GET',
      url: `/blogs/${match.params.blogId}`,
    })
      .then(response => {
        setBlog(response.data)
        console.log(response.data)
      })
      .catch(error => {})
  }, [])

  const destroyBlog = () => {
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'DELETE',
      url: `/blogs/${blog.id}`,
    })
      .then(response => {
        history.push('/_/blog')
        console.log(response.data)
    })
      .catch(error => {})
  }

  const handleClose = () => {
    setDeleteConfirmation(false)
  }

  return (
    <>
      <Container className={classes.container}>
        <Container className={classes.header}>
          {blog.avatarURL && <img src={blog.avatarURL} className={classes.avatar} />}
          {!blog.avatarURL && <Avatar>{blog.owner.charAt(0)}</Avatar>}
          <Typography key="title" variant='h3' className={classes.blogTitle}>{blog.title}</Typography>
        </Container>
        <Container className={classes.blogContents}>
          <>
            {!blog.quill && blog.contents && blog.contents.split('\n').map((paragraph, index) => {
              return(
              <div key={index}>
                <br/>
                <Typography key="contents" className={classes.blogParagraph}>{paragraph}</Typography>
              </div>
              )
            })}
            {blog.quill && (
              <>
                <ReactQuill theme='bubble' readOnly={true} value={blog.contents}/>
              </>
            ) }
          </>
        </Container>
        <Typography className={classes.credit}>Posted by {blog.owner} on {formatDate(blog.timestamp)}</Typography>
        {blog.owner == authContext.username &&
          <Button className={classes.credit} onClick={() => setDeleteConfirmation(true)}>
            Delete Blog
          </Button>}
        <Modal
          open={deleteConfirmation}
          onClose={handleClose}
          aria-labelledby="confirm-delete"
          aria-describedby="are-you-sure"
        >
          <Container className={classes.modalStyle}>
            <Typography>Are you sure you wish to delete this blog post?</Typography>
            <Button onClick={()=>destroyBlog()}>Yes</Button><Button onClick={() => setDeleteConfirmation(false)}>No</Button>
          </Container>
        </Modal>
        <Container className={classes.commentContainer}>
          <CommentBox/>
        </Container>
      </Container>
      <Button onClick={() => history.push('/_/blog')}>Back to list</Button>
    </>
  )
}

export default withStyles(styles)(withRouter(BlogShow))
