import React, { Fragment } from 'react'
import { Lock, Visibility, VisibilityOff } from '@material-ui/icons'
import {
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles({
  dialogTitle: {
    position: 'relative !important'
  },
  dialogTitleIcon: {
    position: 'absolute !important',
    top: 5
  },
  dialogTitleText: {
    fontFamily: 'Metal Mania',
    marginLeft: 30,
    fontSize: '1.6rem',
    letterSpacing: 1
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column'
  }
})

const Login = ({ visible, setVisible, handleClose }) => {
  const classes = useStyles()

  const VisibilityIcon = () => {
    return (
      <IconButton onClick={() => setVisible((prev) => !prev)}>
        {visible ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    )
  }

  return (
    <Fragment>
      <DialogTitle disableTypography>
        <Typography align="center" className={classes.dialogTitle}>
          <Lock className={classes.dialogTitleIcon} />
          <span className={classes.dialogTitleText}>Login</span>
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          fullWidth
          margin="dense"
          id="user"
          variant="outlined"
          label="User"
          type="text"
          placeholder="Email or Username"
        />
        <TextField
          fullWidth
          margin="dense"
          id="password"
          variant="outlined"
          label="Password"
          type={visible ? 'text' : 'password'}
          placeholder="Enter your password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityIcon />
              </InputAdornment>
            )
          }}
        />
        <div>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Login
          </Button>
        </div>
      </DialogContent>
    </Fragment>
  )
}

export default Login
