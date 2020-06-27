import React from 'react'
import { Hidden } from '@material-ui/core/'
import { makeStyles } from '@material-ui/styles'

import { Sidebar } from './components/Sidebar'
import { Content } from './components/Content'
import { Header } from './components/Header'
import { Copyright } from './components/Copyright'

const drawerWidth = 256
const paperProps = { style: { width: drawerWidth } }

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1'
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1'
  }
}))

const App = () => {
  const styles = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className={styles.root}>
      <nav className={styles.drawer}>
        <Hidden smUp implementation="js">
          <Sidebar PaperProps={paperProps} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Sidebar PaperProps={paperProps} />
        </Hidden>
      </nav>
      <div className={styles.app}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <main className={styles.main}>
          <Content />
        </main>
        <footer className={styles.footer}>
          <Copyright />
        </footer>
      </div>
    </div>
  )
}

export default App
