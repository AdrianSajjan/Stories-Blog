import React from 'react'
import { Router } from 'react-router-dom'
import { CssBaseline, Container, ThemeProvider, createMuiTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Routes } from './components'
import { history } from './utils'

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins', 'arial'].join(',')
  }
})

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh'
  },
  [theme.breakpoints.up('sm')]: {
    container: {
      borderLeft: ['1px', 'solid', theme.palette.divider].join(' '),
      borderRight: ['1px', 'solid', theme.palette.divider].join(' ')
    }
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      borderLeft: 'none',
      borderRight: 'none'
    }
  }
}))

export const App = () => {
  const classes = useStyles()

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" className={classes.container} disableGutters>
          <Routes />
        </Container>
      </ThemeProvider>
    </Router>
  )
}
