import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Dialog, DialogContent, DialogTitle, TextField, Typography, Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1.5)
  },
  dialogTitle: {
    paddingBottom: theme.spacing(1)
  },
  dialogTitleText: {
    fontFamily: 'Metal Mania',
    fontSize: '1.5rem',
    letterSpacing: 1
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column'
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

const SubscribeDialog = (props) => {
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Field is required').email('Provide a valid email')
    }),
    onSubmit: async (values) => {
      console.table(values)
      setLoading(true)
      setTimeout(() => setLoading(false), 5000)
    }
  })

  const { handleSubmit, getFieldProps, errors, touched } = formik
  const { isOpen, setIsOpen } = props

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} classes={{ paper: classes.paper }}>
      <DialogTitle className={classes.dialogTitle} disableTypography>
        <Typography align="center" className={classes.dialogTitleText}>
          Subscribe
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogTitle}>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="text"
              margin="dense"
              variant="outlined"
              error={!!touched.email && !!errors.email}
              helperText={(touched.email && errors.email) || 'Subscribe to our newsletter'}
              {...getFieldProps('email')}
            />
          </div>
          <div className={classes.buttonField}>
            <div className={classes.closeButtonWrapper}>
              <Button type="reset" fullWidth onClick={handleClose} color="secondary">
                Cancel
              </Button>
            </div>
            <div className={classes.loginButtonWrapper}>
              <Button type="submit" fullWidth color="primary" variant="contained" disabled={loading} disableElevation>
                Subscribe
              </Button>
              {loading && <CircularProgress size={24} className={classes.circularProgress} />}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

SubscribeDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired
}

export default SubscribeDialog
