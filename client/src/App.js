import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { CssBaseline, Container, ThemeProvider } from '@material-ui/core'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { Routes, Notifier, SnackContent } from './components'
import { history, verifyAuthentication } from './utils'
import { store } from './store'

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

verifyAuthentication(store)

export const App = () => {
  const classes = useStyles()

  const anchorOrigin = { vertical: 'top', horizontal: 'right' }
  const content = (key, message) => <SnackContent id={key} message={message} />

  return (
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={5} anchorOrigin={anchorOrigin} content={content}>
            <CssBaseline />
            <Container maxWidth="md" className={classes.container} disableGutters>
              <Notifier />
              <Routes />
            </Container>
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </Router>
  )
}
