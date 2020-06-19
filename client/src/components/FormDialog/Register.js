import axios from 'axios'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import React, { Fragment, useState } from 'react'
import { useFormik } from 'formik'
import {
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Link,
  CircularProgress
} from '@material-ui/core'
import { Lock, Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { setSession, getUser, enqueueSnackbar } from '../../actions'
import { setTokens, axiosRequestInterceptor } from '../../utils'

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
  loginColumn: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('xs')]: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row'
    }
  },
  loginLink: {
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(1)
    }
  },
  inputField: {
    marginTop: theme.spacing(1.5)
  },
  buttonField: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  registerButtonWrapper: {
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

const Register = (props) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Field is required'),
      email: Yup.string().required('Field is required').email('Provide a valid email'),
      password: Yup.string().required('Field is required').min(8, 'Cannot be smaller than 8'),
      username: Yup.string()
        .required('Field is required')
        .min(3, 'Cannot be smaller than 3')
        .matches(/^[a-z0-9_]*$/, 'Contains invalid characters'),
      confirmPassword: Yup.string()
        .required('Field is required')
        .equals([Yup.ref('password'), null], "Passwords don't match")
    }),
    onSubmit: async (values, actions) => {
      if (isUserLoading)
        return dispatch(
          enqueueSnackbar({
            message: 'User Loading. Please wait.',
            options: {
              variant: 'info'
            }
          })
        )
      try {
        setLoading(true)
        const res = await axios.post('api/user/register', values)
        setTokens(res.data, false)
        axiosRequestInterceptor(false)
        dispatch(setSession(false))
        dispatch(getUser())
        dispatch(
          enqueueSnackbar({
            message: 'Register Success',
            options: {
              variant: 'success'
            }
          })
        )
        actions.resetForm()
        handleClose()
      } catch (err) {
        const errorResponse = err.response.data
        if (errorResponse) {
          if (errorResponse.validation) {
            errorResponse.errors.forEach((error) => {
              actions.setFieldError(error.param, error.msg)
            })
          } else if (errorResponse.authentication) {
            actions.setFieldError(errorResponse.error.param, errorResponse.error.msg)
          } else {
            dispatch(
              enqueueSnackbar({
                message: errorResponse.msg || 'Registration Failed',
                options: {
                  variant: 'error'
                }
              })
            )
          }
        } else {
          dispatch(
            enqueueSnackbar({
              message: 'Registration Failed',
              options: {
                variant: 'error'
              }
            })
          )
        }
      } finally {
        setLoading(false)
      }
    }
  })

  const { handleClose, changeForm, isUserLoading } = props
  const { handleSubmit, getFieldProps, errors, touched } = formik

  const switchForm = () => {
    changeForm(0)
  }

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
          <span className={classes.dialogTitleText}>Register</span>
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.loginColumn}>
          <Typography>Have an account?</Typography>
          <Link variant="body1" component="button" className={classes.loginLink} align="left" onClick={switchForm}>
            Sign In
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              fullWidth
              error={!!touched.name && !!errors.name}
              margin="dense"
              name="name"
              id="name"
              variant="outlined"
              label="Name"
              type="text"
              placeholder="Enter Name"
              helperText={(touched.name && errors.name) || 'Enter your full name'}
              {...getFieldProps('name')}
            />
            <TextField
              fullWidth
              className={classes.inputField}
              error={!!touched.username && !!errors.username}
              margin="dense"
              name="username"
              id="username"
              variant="outlined"
              label="User Name"
              type="text"
              placeholder="Enter Username"
              helperText={(touched.username && errors.username) || 'Allowed Characters: a-z 0-9 and _'}
              {...getFieldProps('username')}
            />
            <TextField
              fullWidth
              className={classes.inputField}
              error={!!touched.email && !!errors.email}
              margin="dense"
              name="email"
              id="email"
              variant="outlined"
              label="Email"
              type="text"
              placeholder="Enter Email"
              helperText={(touched.email && errors.email) || 'Your email is safe with us'}
              {...getFieldProps('email')}
            />
            <TextField
              fullWidth
              className={classes.inputField}
              error={!!touched.password && !!errors.password}
              margin="dense"
              name="password"
              id="password"
              variant="outlined"
              label="Password"
              type={visible ? 'text' : 'password'}
              placeholder="Enter Password"
              helperText={(touched.password && errors.password) || 'Minimium 8 characters'}
              InputProps={{ endAdornment: <VisibilityIcon /> }}
              {...getFieldProps('password')}
            />
            <TextField
              fullWidth
              className={classes.inputField}
              error={!!touched.confirmPassword && !!errors.confirmPassword}
              margin="dense"
              name="confirmPassword"
              id="confirmPassword"
              variant="outlined"
              label="Confirm Password"
              type={visible ? 'text' : 'password'}
              placeholder="Retype Password"
              helperText={(touched.confirmPassword && errors.confirmPassword) || 'Retype your password'}
              {...getFieldProps('confirmPassword')}
            />
          </div>
          <div className={classes.buttonField}>
            <div className={classes.closeButtonWrapper}>
              <Button type="reset" fullWidth onClick={handleClose} color="secondary">
                Cancel
              </Button>
            </div>
            <div className={classes.registerButtonWrapper}>
              <Button type="submit" fullWidth color="primary" variant="contained" disabled={loading} disableElevation>
                Register
              </Button>
              {loading && <CircularProgress size={24} className={classes.circularProgress} />}
            </div>
          </div>
        </form>
      </DialogContent>
    </Fragment>
  )
}

export default Register
