import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Login, Register } from './'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1.5)
  }
}))

const FormDialog = (props) => {
  const classes = useStyles()
  const isUserLoading = useSelector((state) => state.user.loading)
  const [currentForm, setCurrentForm] = useState(0)

  const { isOpen, setIsOpen } = props

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} classes={{ paper: classes.paper }}>
      {currentForm === 0 && (
        <Login handleClose={handleClose} changeForm={setCurrentForm} isUserLoading={isUserLoading} />
      )}
      {currentForm === 1 && (
        <Register handleClose={handleClose} changeForm={setCurrentForm} isUserLoading={isUserLoading} />
      )}
    </Dialog>
  )
}

FormDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired
}

export default FormDialog
