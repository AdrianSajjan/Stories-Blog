import React, { Fragment } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Header } from '../../components'
import { FormDialog, Sidebar } from '../../components'

const useStyles = makeStyles({
  container: {
    minHeight: 'calc(100vh - 200px)'
  }
})

const MainLayout = (props) => {
  const classes = useStyles()
  const { children } = props

  return (
    <Fragment>
      <FormDialog />
      <Sidebar />
      <Header />
      <Container maxWidth="md" className={classes.container}>
        {children}
      </Container>
    </Fragment>
  )
}

export default MainLayout
