import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

import { App } from './App'
import { history } from './utils'
import { store } from './store'

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(',')
  }
})

const anchorOrigin = { vertical: 'top', horizontal: 'right' }

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={5} anchorOrigin={anchorOrigin}>
            <CssBaseline />
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
