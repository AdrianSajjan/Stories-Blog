import React, { Fragment, useState } from 'react'
import { Lock, Visibility, VisibilityOff } from '@material-ui/icons'
import {
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Button,
  Link,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
  },
  registerColumn: {
    display: 'flex',
    marginBottom: 5,
    [theme.breakpoints.up('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row'
    }
  },
  registerLink: {
    [theme.breakpoints.up('xs')]: {
      marginLeft: 0
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 5
    }
  },
  inputField: {
    marginTop: 15
  },
  checkboxField: {
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      marginTop: 15,
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  },
  buttonField: {
    margin: ['5px', '0', '10px', '0'].join(' '),
    display: 'flex',
    alignItems: 'center'
  },
  closeButton: {
    marginRight: 15
  }
}))

const Login = ({ handleClose }) => {
  const classes = useStyles()
  const [visible, setVisible] = useState(false)

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
        <div className={classes.registerColumn}>
          <Typography>Don't have an account?</Typography>
          <Link variant="body1" component="button" className={classes.registerLink} align="left">
            Sign Up
          </Link>
        </div>
        <div>
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
            className={classes.inputField}
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
        </div>
        <div className={classes.checkboxField}>
          <FormControlLabel control={<Checkbox color="primary" />} label="Remember Me" />
          <Link href="#" variant="body1">
            Forgot Password?
          </Link>
        </div>
        <div className={classes.buttonField}>
          <Button fullWidth onClick={handleClose} className={classes.closeButton} color="secondary">
            Cancel
          </Button>
          <Button fullWidth onClick={handleClose} color="primary" variant="contained" disableElevation>
            Login
          </Button>
        </div>
      </DialogContent>
    </Fragment>
  )
}

export default Login
