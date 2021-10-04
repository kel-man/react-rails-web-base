import React, { useState } from 'react'
import { Editor, EditorState } from 'draft-js'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core/'

const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row',
    background: 'linear-gradient(to right, #66bb6a, #004d40)',
    justifyContent: 'flex-end',
  },
})

const Whiteboard = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  console.log(editorState)

  return (
    <>
      <Typography>This is some typography that should render</Typography>
      <Editor editorState={editorState} onChange={setEditorState} />
    </>
  )
}

export default withStyles(styles)(withRouter(Whiteboard))
