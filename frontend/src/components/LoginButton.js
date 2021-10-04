import React from 'react'
import { Button, Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    display: 'flex',
  }
})

var Variable
if(context.loggedIn){
  Variable =
    <>
      <Typography>This is a placeholder tooltip for the logged in variant of this effect</Typography>
    </>
} else {
  Variable =
    <>
      <p>Component</p>
    </>
}

const LoginButton = ({classes}) => {
  return(
    <>
      {Variable}
    </>
  )
}

export default withStyles(styles)(withRouter(LoginButton))
