import React, { useState } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import ReactQuill from 'react-quill'
import './quillOverrides.css'
import 'react-quill/dist/quill.snow.css'

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'left',
    flexFlow: 'column',
  },
  qlEditor: {
    minHeight: '400px',
  },
  blogTitle: {
  },
})

const BlogCreate = ({ classes, history }) => {
  const [newPost, setNewPost] = useState([])
  const [refresh, setRefresh] = useState(0)
  const [quillText, setQuillText] = useState('')

  const changeTitle = e => {
    const { key, value } = e.target
    setNewPost({ ...newPost, title: value })
  }

  const changeContents = e => {
    const { key, value } = e.target
    setNewPost({ ...newPost, contents: value })
  }

  const savePost = () => {
    const data = { title: newPost.title, contents: quillText }
    !('id' in newPost)
      ? axios({
          headers: {
            contentType: 'application/json',
          },
          method: 'POST',
          url: '/blogs',
          data: {
            blog: data,
          },
        })
          .then(response => {
            console.log(response)
            setRefresh(refresh + 1)
            setNewPost({})
          })
          .catch(error => {
            console.log(error)
          })
      : axios({
          headers: {
            contentType: 'application/json',
          },
          method: 'PATCH',
          url: `/blogs/${newPost.id}`,
          data: {
            item: data,
          },
        })
          .then(response => {
            console.log(response)
            setRefresh(refresh + 1)
          })
          .catch(error => {
            console.log(error)
          })
    history.push('/_/blog')
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block', 'blockquote'],
      [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rt1' }],
      // [{ 'size': ['small': false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']
    ],
  }

  return (
    <>
      <TextField inputProps={{ 'data-testid': 'title' }} label="Blog Title" className={classes.blogTitle} onChange={changeTitle} />
      <ReactQuill readOnly={false} value={quillText} modules={modules} onChange={setQuillText}/>
      <Button onClick={() => savePost()}>Post!</Button>
      <Button onClick={() => history.push('/_/blog')}>Back to list</Button>
    </>
  )
}

export default withStyles(styles)(withRouter(BlogCreate))
