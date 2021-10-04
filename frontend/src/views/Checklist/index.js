import React, { useState, useEffect } from 'react'
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Container,
  CssBaseline,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  TextField,
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import NoteIcon from '@material-ui/icons/Note'
import BorderColorIcon from '@material-ui/icons/BorderColor'

const drawerWidth = 240
const styles = theme => ({
  form: {
    display: 'flex',
    flexFlow: 'column',
    maxWidth: '500px',
    padding: '20px',
    justifyContent: 'center',
    backgroundColor: theme.ash,
  },
  drawer: {
    marginTop: '50px',
    width: drawerWidth,
  },
  container: {
    display: 'flex',
    marginLeft: drawerWidth,
    alignItems: 'left',
    flexFlow: 'column',
    marginTop: '50px',
  },
  editSave: {
    maxWidth: '75px',
    display: 'inline-block',
  },
  topicInput: {
    marginLeft: '150px',
    marginRight: '250px',
  },
  contentsInput: {
    marginTop: '20px',
    height: '640px',
    marginLeft: '50px',
    marginRight: '100px',
  },
  header: {
    alignSelf: 'center',
    marginTop: '30px',
  },
})

const Checklist = ({ classes, history }) => {
  const [items, setItems] = useState([])
  const [editItem, setEditItem] = useState({ topic: '', contents: '' })
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'GET',
      url: '/items',
    })
      .then(response => {
        console.log('response: ', response.data)
        setItems(response.data.items)
      })
      .catch(error => {})
  }, [refresh])

  const changeTopic = e => {
    const { key, value } = e.target
    setEditItem({ ...editItem, topic: value })
  }

  const changeContents = e => {
    const { key, value } = e.target
    setEditItem({ ...editItem, contents: value })
  }

  const onSubmit = e => {
    const data = { topic: editItem.topic, contents: editItem.contents }
    !('id' in editItem)
      ? axios({
          headers: {
            contentType: 'application/json',
          },
          method: 'POST',
          url: '/items',
          data: {
            item: data,
          },
        })
          .then(response => {
            setRefresh(refresh + 1)
            expandItem(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      : axios({
          headers: {
            contentType: 'application/json',
          },
          method: 'PATCH',
          url: `/items/${editItem.id}`,
          data: {
            item: data,
          },
        })
          .then(response => {
            setRefresh(refresh + 1)
          })
          .catch(error => {
            console.log(error)
          })
  }

  const onDelete = id => {
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'DELETE',
      url: `/items/${id}`,
      data: { id },
    })
      .then(response => {
        console.log(response)
        setRefresh(refresh + 1)
      })
      .catch(error => console.log(error))
  }

  const expandItem = item => {
    setEditItem(item)
    setRefresh(refresh + 1)
  }

  const newItem = () => {
    setEditItem({ topic: '', contents: '' })
    setRefresh(refresh + 1)
  }

  return (
    <>
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.header}>
          Checklist
        </Typography>
        <TextField
          key="currentTopic"
          value={editItem.topic}
          label="Item Topic"
          onChange={changeTopic}
          className={classes.topicInput}
          inputProps={{
            'data-testid': 'topic',
          }}
        />
        <TextField
          key="currentItem"
          variant="outlined"
          label="Item Contents"
          data-testid="contents"
          multiline
          rows={30}
          value={editItem.contents}
          onChange={changeContents}
          className={classes.contentsInput}
        />
        <Container className={classes.editSave}>
          <Button variant="contained" type="submit" onClick={onSubmit}>
            Save
          </Button>
          <Button key={editItem.id} onClick={() => onDelete(editItem.id)}>
            Delete
          </Button>
        </Container>
      </Container>
      <Drawer variant="permanent" anchor="left" classes={{ paper: classes.drawer }}>
        <div />
        <Button onClick={newItem}>Create new</Button>
        <Divider />
        <List>
          {items.map(item => (
            <ListItem button key={item.topic} onClick={() => expandItem(item)}>
              {item.id == editItem.id && (
                <>
                  <BorderColorIcon />
                </>
              )}
              {item.id !== editItem.id && (
                <>
                  <NoteIcon />
                </>
              )}
              <ListItemText style={{ marginLeft: '5px' }} primary={item.topic} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default withStyles(styles)(withRouter(Checklist))
