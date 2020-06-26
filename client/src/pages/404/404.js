import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Card, CardContent, Button, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  rootContainer: {
    minHeight: 'calc(100vh - 100px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16
  },
  typographyPrimary: {
    fontFamily: '"Roboto Mono", monospace',
    marginBottom: 16,
    fontWeight: 'normal'
  },
  typographySecondary: {
    fontFamily: '"Roboto Mono", monospace',
    marginBottom: 24,
    fontWeight: 'normal'
  },
  homeButton: {
    width: 200
  },
  buttonTypography: {
    fontFamily: '"Roboto Mono", monospace'
  }
})

const Error404 = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="sm" className={classes.rootContainer}>
      <Card elevation={5} square>
        <CardContent className={classes.cardContent}>
          <Typography variant="h4" align="center" className={classes.typographyPrimary}>
            Error 404
          </Typography>
          <Typography variant="h6" align="center" className={classes.typographySecondary}>
            The page you are looking for might have been deleted or moved to a new location or might not exist on the
            server.
          </Typography>
          <Button variant="contained" color="secondary" className={classes.homeButton} component={RouterLink} to="/">
            <Typography variant="button" className={classes.buttonTypography}>
              Go Home
            </Typography>
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Error404
