import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Box, Button, Menu, MenuItem, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const styles = theme => ({
  container: {},
})

const SortBar = ({ classes, history, sortMethod, setSortMethod }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = e => {
    setAnchorEl(e.currentTarget)
  }

  const selectTab = e => {
    setSorting(e.target.value)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const sortByTop = e => {
    setTopSorting(e.target.value)
    setSorting(2)
    setAnchorEl(null)
  }

  const sortBy = e => {
    setSorting(e.target.value)
  }

  return (
    <>
      <Box>
        <Button label={'New'} value={0} onClick={sortBy}>
          New
        </Button>
        <Button label={'Trending'} value={1} onClick={sortBy}>
          Trending
        </Button>
        <Button onClick={openMenu}>Top</Button>
        <Menu id="sort-by" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
          <MenuItem value={0} onClick={() => setSortMethod('top-today')}>
            Today
          </MenuItem>
          <MenuItem value={1} onClick={() => setSortMethod('top-this-week')}>
            This week
          </MenuItem>
          <MenuItem value={2} onClick={() => setSortMethod('top-this-month')}>
            This month
          </MenuItem>
          <MenuItem value={3} onClick={() => setSortMethod('top-all-time')}>
            All time
          </MenuItem>
        </Menu>
      </Box>
    </>
  )
}

export default withStyles(styles)(withRouter(SortBar))
