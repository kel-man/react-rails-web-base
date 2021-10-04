import React, { useContext } from 'react'
import AuthContext from '../AuthContext'
import { Box, Button, CssBaseline, Typography, Drawer } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'

const styles = theme => ({
  container: {
    height: '50px',
    display: 'flex',
    flexFlow: 'row',
    background: '#004d40',
    justifyContent: 'space-between',
  },
  welcome: {
    alignSelf: 'center',
    justifySelf: 'flex-start',
    marginLeft: '20px',
  },
  buttons: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
})

const NavBar = ({ classes, history }) => {
  const authContext = useContext(AuthContext)

  const logout = () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      url: '/users/sign_out',
    }).then(() => (window.location = '/'))
  }

  return (
    <>
      <Drawer variant="permanent" anchor="top">
        <Box className={classes.container}>
          {authContext.loggedIn && <Typography className={classes.welcome}>Welcome, {authContext.username}</Typography>}
          {!authContext.loggedIn && <div />}
          <div className={classes.buttons}>
            {!authContext.loggedIn && (
              <>
                <Button color="inherit" edge="start" onClick={() => history.push('/')}>
                  Home
                </Button>
              </>
            )}
            {authContext.loggedIn && (
              <>
                <Button color="inherit" edge="start" onClick={() => history.push('/_/checklist')}>
                  Home
                </Button>
              </>
            )}
            {authContext.loggedIn && (
              <Button color="inherit" onClick={() => history.push('/_/profile')}>
                Profile
              </Button>
            )}
            <Button color="inherit" onClick={() => history.push('/_/pricing')}>
              Pricing
            </Button>
            <Button color="inherit" onClick={() => history.push('/_/blog')}>
              Blog
            </Button>
            {authContext.loggedIn && (
              <Button color="inherit" onClick={() => history.push('/_/Checklist')}>
                Checklist
              </Button>
            )}
            <Button color="inherit" onClick={() => history.push('/_/FAQ')}>
              F.A.Q.
            </Button>
            {!authContext.loggedIn && (
              <>
                <Button color="inherit" onClick={() => history.push('/_/signup')}>
                  Sign Up
                </Button>
                <Button color="inherit" edge="end" variant="outlined" onClick={() => history.push('/')}>
                  Log-in
                </Button>
              </>
            )}
            {authContext.loggedIn && (
              <>
                <Button color="inherit" onClick={logout}>
                  Log Out
                </Button>
              </>
            )}
          </div>
        </Box>
      </Drawer>
    </>
  )
}

export default withStyles(styles)(withRouter(NavBar))
