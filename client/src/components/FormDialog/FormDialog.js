import React from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Login } from './'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1.5)
  }
}))

const FormDialog = (props) => {
  const { isOpen, setIsOpen } = props
  const classes = useStyles()

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} classes={{ paper: classes.paper }}>
      <Login handleClose={handleClose} />
    </Dialog>
  )
}

FormDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired
}

export default FormDialog
