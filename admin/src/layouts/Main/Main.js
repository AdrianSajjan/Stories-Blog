import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Hidden } from '@material-ui/core/'
import { makeStyles, useTheme } from '@material-ui/styles'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Copyright } from '../../components/Copyright'
import { toggleSidebar } from '../../actions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(32),
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

const MainLayout = ({ children }) => {
  const styles = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()

  const isOpen = useSelector((state) => state.misc.isOpen)
  const handleClose = () => dispatch(toggleSidebar(false))
  const handleToggle = () => dispatch(toggleSidebar(false, true))

  return (
    <div className={styles.root}>
      <nav className={styles.drawer}>
        <Hidden smUp implementation="js">
          <Sidebar PaperProps={{ style: { width: theme.spacing(32) } }} variant="temporary" />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Sidebar PaperProps={{ style: { width: theme.spacing(32) } }} open={isOpen} onClose={handleClose} />
        </Hidden>
      </nav>
      <div className={styles.app}>
        <Header onSidebarToggle={handleToggle} />
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <Copyright />
        </footer>
      </div>
    </div>
  )
}

export default MainLayout
