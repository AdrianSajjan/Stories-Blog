import React from 'react'
import { useDispatch } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Close } from '@material-ui/icons'
import { closeSnackbar } from '../../actions'

const useStyles = makeStyles({
  closeIcon: {
    color: '#fff'
  }
})

const CloseButton = (props) => {
  const { id } = props
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <IconButton onClick={() => dispatch(closeSnackbar(id))}>
      <Close className={classes.closeIcon} />
    </IconButton>
  )
}

export default CloseButton
