import React from 'react'
import { Router } from 'react-router-dom'
import { CssBaseline, Container, ThemeProvider, createMuiTheme } from '@material-ui/core'
//import { Routes } from './components'
import { history } from './utils'
import { Header } from './components'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins'
  }
})

export const App = () => {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header />
        </Container>
      </ThemeProvider>
    </Router>
  )
}
