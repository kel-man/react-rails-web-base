import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthContext from './AuthContext'
import HomePage from './views/HomePage/'
import SignUp from './views/SignUp/'
import FAQ from './views/FAQ/'
import Navbar from './components/NavBar'
import UserProfile from './views/UserProfile/'
import Pricing from './views/Pricing/'
import Whiteboard from './views/Whiteboard/'
import Checklist from './views/Checklist/'
import Blog from './views/Blog/'
import Footer from './components/Footer'
import { Box } from '@material-ui/core'

const AppRouter = () => {
  const authContext = useContext(AuthContext)
  return (
    <>
      <Router>
        <Navbar />
        <Box marginTop='50px'/>
        <Switch>
          <Route path="/_/FAQ" component={FAQ} />
          <Route path="/_/profile" component={UserProfile} />
          <Route path="/_/pricing" component={Pricing} />
          <Route path="/_/blog" component={Blog} />
          <Route path="/_/signup" component={SignUp} />
          <Route path="/_/homepage" component={HomePage} />
          <Route path="/_/checklist" component={Checklist} />
          {!authContext.loggedIn && <Route path="/" component={HomePage} />}
          {authContext.loggedIn && <Route path="/" component={Checklist} />}
        </Switch>
        <Footer/>
      </Router>
    </>
  )
}

export default AppRouter
