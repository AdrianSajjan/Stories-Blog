import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { verifyAuthentication } from './utils'
import { SnackContent } from './components'
import { history } from './utils'
import { store } from './store'

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins', 'arial'].join(',')
  }
})

const anchorOrigin = { vertical: 'top', horizontal: 'right' }
const content = (key, message) => <SnackContent id={key} message={message} />

verifyAuthentication(store)

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={5} anchorOrigin={anchorOrigin} content={content}>
            <CssBaseline />
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
