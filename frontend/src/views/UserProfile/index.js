import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
  TextField,
  Button,
  Input,
  FormLabel,
} from '@material-ui/core'
import AuthContext from '../../AuthContext'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
  },
  formLabel: {
    color: 'darkBlue',
    borderStyle: 'solid',
    borderColor: 'darkBlue',
    borderWidth: '2px',
    '&:hover': {
      color: 'blue',
      borderColor: 'blue',
    },
  },
  header: {},
  avatarInput: {
    display: 'none',
  },
  avatar: {
    height: '150px',
    width: '150px',
  },
  avatarBox: {
    display: 'flex',
    alignSelf: 'flex-end',
    flexFlow: 'column',
    justifyContent: 'flex-end',
    width: '150px',
  },
  bio: {
    alignSelf: 'flex-start',
  },
  username: {
    alignSelf: 'flex-start',
  },
  accordions: {
    width: '150px',
  },
})
const UserProfile = ({ classes, history }) => {
  const [profile, setProfile] = useState([])
  const authContext = useContext(AuthContext)
  const [avatar, setAvatar] = useState([])
  const [username, setUsername] = useState([])
  const [newUsername, setNewUsername] = useState([])
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    console.log(authContext)
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'GET',
      url: '/profiles/0',
    })
      .then(response => {
        setProfile(response.data)
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [refresh])

  const changeSelectedFile = e => {
    setAvatar(...avatar, e.target.files[0])
    console.log(avatar)
  }

  const submitAvatar = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('avatar', avatar)
    // const data = { profile: formData }
    const data = formData
    console.log(avatar)
    console.log(data)
    axios({
      headers: {
        contentType: 'multipart/form-data',
      },
      method: 'PATCH',
      url: `/profiles/${profile.id}`,
      data,
    })
      .then(response => {
        console.log(response)
        setAvatar([])
        setRefresh(refresh + 1)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const changeUsername = () => {
    let data = { username: newUsername }
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'PATCH',
      url: `/profiles/${profile.id}`,
      data,
    })
      .then(response => {
        setRefresh(refresh + 1)
        setNewUsername([''])
      })
      .catch(error => console.log(error))
  }

  const editUsername = e => {
    setNewUsername(e.target.value)
  }

  return (
    <>
      <Container className={classes.container}>
        <Container className={classes.username}>
          <Typography variant="h3" className={classes.header}>
            {profile.username}
          </Typography>
          <Accordion className={classes.accordions}>
            <AccordionSummary>Edit Username</AccordionSummary>
            <AccordionDetails>
              <TextField onChange={editUsername}>New Username</TextField>
              <Button onClick={() => changeUsername()}>Change Username</Button>
            </AccordionDetails>
          </Accordion>
        </Container>
        <Container className={classes.avatarBox}>
          {profile.avatarURL && <img src={profile.avatarURL} className={classes.avatar} />}
          <Accordion className={classes.accordions}>
            <AccordionSummary>Edit Profile Picture</AccordionSummary>
            <AccordionDetails>
              <form onSubmit={e => submitAvatar(e)}>
                <FormLabel className={classes.formLabel}>
                  Select File
                  <Input type="file" onChange={e => changeSelectedFile(e)} className={classes.avatarInput} />
                </FormLabel>
                <Button type="submit">Submit Avatar</Button>
              </form>
            </AccordionDetails>
          </Accordion>
        </Container>
      </Container>
      <Container className={classes.bio}>
        <Typography variant="h4">Bio</Typography>
        <Typography>{profile.bio}</Typography>
      </Container>
    </>
  )
}

export default withStyles(styles)(withRouter(UserProfile))
