import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Login, Register } from './'
import { toggleFormDialog } from '../../actions'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1.5)
  }
}))

const FormDialog = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isUserLoading = useSelector((state) => state.user.loading)
  const isOpen = useSelector((state) => state.misc.formDialogOpen)
  const [currentForm, setCurrentForm] = useState(0)

  const handleClose = () => {
    dispatch(toggleFormDialog(false))
  }

  return (
    <Container maxWidth="md">
      <Dialog open={isOpen} onClose={handleClose} classes={{ paper: classes.paper }}>
        {currentForm === 0 && (
          <Login handleClose={handleClose} changeForm={setCurrentForm} isUserLoading={isUserLoading} />
        )}
        {currentForm === 1 && (
          <Register handleClose={handleClose} changeForm={setCurrentForm} isUserLoading={isUserLoading} />
        )}
      </Dialog>
    </Container>
  )
}

export default FormDialog
