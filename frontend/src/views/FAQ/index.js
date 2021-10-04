import React from 'react'
import { Container, CssBaseline, Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

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

const FAQ = ({ history }) => {
  return (
    <>
      <CssBaseline />
      <Container>
        <Typography>Frequently Asked Questions</Typography>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className="heading">Who are the Brothers Yafuso?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The brothers Liam and Kelen Yafuso are two insightful and talented engineers specializing in consultation
              and advanced web development. We emphazise the power and efficiency of customizable solutions and engines
              while staying up to date with bleeding edge, lightning fast technology and techniques.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="Panel1a-content" id="panel1a-header">
            <Typography className="heading">Why do we do it?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We fervently believe in the advancement of human understanding and technology. By utilizing
              top-of-the-line and cutting edge libraries and strategies, we pave the way for logical and adaptable
              construction of software that is not only powerful out-of-the-box, but is also ready for expansion and
              reorientation with fluidity and with no loss in power.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  )
}

export default withStyles(styles)(withRouter(FAQ))
