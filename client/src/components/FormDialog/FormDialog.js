import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@material-ui/core'
import { Login } from './'

const FormDialog = (props) => {
  const { isOpen, setIsOpen } = props

  const [visible, setVisible] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Login visible={visible} setVisible={setVisible} handleClose={handleClose} />
    </Dialog>
  )
}

FormDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired
}

export default FormDialog
