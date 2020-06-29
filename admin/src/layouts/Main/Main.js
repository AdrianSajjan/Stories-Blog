import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Copyright } from '../../components/Copyright'

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

  return (
    <div className={styles.root}>
      <nav className={styles.drawer}>
        <Sidebar />
      </nav>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <Copyright />
        </footer>
      </div>
    </div>
  )
}

export default MainLayout
