import { createMuiTheme } from '@material-ui/core/styles'

const charcoal = '#333'
const ash = '#666'

const Theme = createMuiTheme({
  charcoal,
  ash,
  palette: {
    type: 'dark',
    primary: {
      main: '#fff',
    },
  },
})

export default Theme
