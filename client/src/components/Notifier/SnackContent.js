import React, { forwardRef } from 'react'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  alert: {
    width: '100%',
    maxWidth: 400,
    boxShadow: theme.shadows[5]
  }
}))

const SnackContent = forwardRef((props, ref) => {
  const { closeSnackbar } = useSnackbar()

  const classes = useStyles()
  const severity = useSelector(
    (store) =>
      [...store.notify.notifications.filter((notification) => notification.key === props.id)].map(
        (notification) => notification.options.variant
      )[0]
  )

  const handleDismiss = () => {
    closeSnackbar(props.id)
  }

  return (
    <Alert className={classes.alert} ref={ref} onClose={handleDismiss} severity={severity || 'info'} variant="filled">
      {props.message}
    </Alert>
  )
})

export default SnackContent
