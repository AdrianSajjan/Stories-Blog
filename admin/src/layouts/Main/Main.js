import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Copyright } from '../../components/Copyright'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      display: 'block'
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    },
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(32),
      flexShrink: 0
    }
  },
  app: {
    [theme.breakpoints.down('xs')]: {
      minHeight: '100vh'
    },
    [theme.breakpoints.up('sm')]: {
      flex: 1
    },
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    background: '#eaeff1',
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(6, 2)
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4, 6)
    }
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
