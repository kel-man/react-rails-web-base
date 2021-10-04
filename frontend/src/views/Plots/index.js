import React from 'react'
import { CssBaseline, Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
// import Plot from 'react-plotly.js'

// const Plotly = require('plotly.js-dist')

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
var Information = {
  Ramen: {
    ReviewNumber: [],
    Brand: [],
    Variety: [],
    Style: [],
    Country: [],
    Stars: [],
  },
}

var ramenRatings = require('../../data/ramen/ramen-ratings.json')
ramenRatings.map(item => {
  Information.Ramen.ReviewNumber.push(item.Review)
  Information.Ramen.Brand.push(item.Brand)
  Information.Ramen.Variety.push(item.Variety)
  Information.Ramen.Style.push(item.Style)
  Information.Ramen.Country.push(item.Country)
  Information.Ramen.Stars.push(item.Stars)
  delete item['Top Ten']
  return null
})

const Ramen = [
  {
    x: Information.Ramen.ReviewNumber,
    y: Information.Ramen.Stars,
    type: 'scatter',
    mode: 'markers',
    marker: { color: 'green' },
  },
  {
    type: 'bar',
    x: Information.Ramen.ReviewNumber,
    y: Information.Ramen.Stars,
  },
]

const Plots = ({ classes, history }) => {
  return (
    <>
      <CssBaseline />
      <Typography>Plots page</Typography>
      {/* <Plot data={Ramen} layout={{ width: 1200, height: 900, title: 'Ramens' }} /> */}
    </>
  )
}

export default withStyles(styles)(withRouter(Plots))
