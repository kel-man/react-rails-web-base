import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button, Container, CssBaseline, Typography } from '@material-ui/core'
import axios from 'axios'

const styles = theme => ({
  form: {
    display: 'flex',
    flexFlow: 'column',
    maxWidth: '500px',
    padding: '20px',
    justifyContent: 'center',
    backgroundColor: theme.ash,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column',
  },
  textField: {
    marginBottom: '20px',
  },
})

const SignUp = ({ classes, history }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const inputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const onSubmit = e => {
    e.preventDefault()
    const data = { ...values }
    data.password_confirmation = values.password
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'POST',
      url: '/users',
      data: {
        user: data,
      },
    })
      .then(response => {
        history.push('/')
      })
      .catch(error => {})
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography color="primary">SignUp</Typography>
        <form onSubmit={onSubmit} className={classes.form}>
          <TextField className={classes.textField} name="email" onChange={inputChange} label="Email" />
          <TextField
            className={classes.textField}
            name="password"
            type="password"
            onChange={inputChange}
            label="Password"
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </>
  )
}

export default withStyles(styles)(withRouter(SignUp))
