import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { Fragment, useState } from 'react'
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
  CircularProgress
} from '@material-ui/core'
import { Lock, Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { enqueueSnackbar, loginUser } from '../../actions'

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
    marginLeft: theme.spacing(4),
    fontSize: '1.6rem',
    letterSpacing: 1
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  registerColumn: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('xs')]: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row'
    }
  },
  registerLink: {
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(1)
    }
  },
  inputField: {
    marginTop: theme.spacing(1.5)
  },
  checkboxField: {
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(1.5),
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(0.5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  },
  buttonField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  loginButtonWrapper: {
    position: 'relative',
    marginLeft: theme.spacing(1),
    flex: 1
  },
  closeButtonWrapper: {
    marginRight: theme.spacing(1),
    flex: 1
  },
  circularProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: theme.spacing(-1.5),
    marginLeft: theme.spacing(-1.5)
  }
}))

const Login = (props) => {
  const [visible, setVisible] = useState(false)
  const [remember, setRemember] = useState(false)

  const loading = useSelector((state) => state.request.login)
  const dispatch = useDispatch()
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      user: '',
      password: ''
    },
    validationSchema: Yup.object({
      user: Yup.string().required('Field is required'),
      password: Yup.string().required('Field is required')
    }),
    onSubmit: async (values, actions) => {
      if (isUserLoading) return dispatch(enqueueSnackbar({ message: 'User Loading. Please wait!' }))
      dispatch(loginUser(values, actions.setFieldError, handleClose, remember))
    }
  })

  const { handleClose, changeForm, isUserLoading } = props
  const { handleSubmit, getFieldProps, errors, touched } = formik

  const VisibilityIcon = () => (
    <InputAdornment position="end">
      <IconButton type="button" onClick={() => setVisible((prev) => !prev)}>
        {visible ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  )

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
          <Link
            variant="body1"
            component="button"
            className={classes.registerLink}
            align="left"
            onClick={() => changeForm(1)}
          >
            Sign Up
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              fullWidth
              name="user"
              label="User"
              type="text"
              margin="dense"
              variant="outlined"
              error={!!touched.user && !!errors.user}
              helperText={(touched.user && errors.user) || 'Enter your username or email'}
              {...getFieldProps('user')}
            />
            <TextField
              fullWidth
              className={classes.inputField}
              name="password"
              label="Password"
              type={visible ? 'text' : 'password'}
              margin="dense"
              variant="outlined"
              error={!!touched.password && !!errors.password}
              helperText={(touched.password && errors.password) || 'Enter your password'}
              InputProps={{ endAdornment: <VisibilityIcon /> }}
              {...getFieldProps('password')}
            />
          </div>
          <div className={classes.checkboxField}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="remember"
                  checked={remember}
                  onChange={() => setRemember((prevState) => !prevState)}
                />
              }
              label="Remember Me"
            />
            <Link component={RouterLink} to="recovery" variant="body1">
              Forgot Password?
            </Link>
          </div>
          <div className={classes.buttonField}>
            <div className={classes.closeButtonWrapper}>
              <Button type="reset" fullWidth onClick={handleClose} color="secondary">
                Cancel
              </Button>
            </div>
            <div className={classes.loginButtonWrapper}>
              <Button type="submit" fullWidth color="primary" variant="contained" disabled={loading} disableElevation>
                Login
              </Button>
              {loading && <CircularProgress size={24} className={classes.circularProgress} />}
            </div>
          </div>
        </form>
      </DialogContent>
    </Fragment>
  )
}

export default Login
