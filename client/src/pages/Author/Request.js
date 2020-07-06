import React, { Fragment } from 'react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { TextField, Button, Typography, FormControlLabel, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { authorRequest } from '../../actions'

const useStyles = makeStyles((theme) => ({
  pageStart: {
    marginTop: theme.spacing(5)
  },
  pageTitle: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 'normal'
  },
  disclaimer: {
    fontWeight: 'normal',
    color: theme.palette.grey[600],
    marginTop: theme.spacing(1)
  },
  inputFields: {
    display: 'flex',
    flexDirection: 'column'
  },
  inputField: {
    marginTop: theme.spacing(2)
  },
  buttonField: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  cancelButton: {
    minWidth: 120,
    marginRight: theme.spacing(1)
  },
  submitButton: {
    minWidth: 120,
    marginLeft: theme.spacing(1)
  }
}))

const BecomeAnAuthor = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      hasMail: true,
      mailBody: '',
      mailSubject: ''
    },
    validationSchema: Yup.object({
      hasMail: Yup.boolean(),
      mailBody: Yup.string().when('hasMail', {
        is: true,
        then: Yup.string().required('Field is required').min(30, "Can't be less than 20 letters."),
        otherwise: Yup.string().optional()
      }),
      mailSubject: Yup.string().when('hasMail', {
        is: true,
        then: Yup.string().required('Field is required').min(10, "Can't be less than 20 letters."),
        otherwise: Yup.string().optional()
      })
    }),
    onSubmit: (values, actions) => {
      dispatch(authorRequest(values))
      actions.resetForm()
    }
  })

  const { values, errors, touched, setFieldValue, getFieldProps, handleSubmit } = formik

  const handleChangeMail = (event) => {
    setFieldValue('hasMail', event.target.checked)
  }

  return (
    <Fragment>
      <div className={classes.pageStart}>
        <Typography align="center" variant="h5" className={classes.pageTitle} gutterBottom>
          Become An Author
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputFields}>
            <TextField
              name="subject"
              id="subject"
              label="Subject"
              variant="outlined"
              margin="dense"
              className={classes.inputField}
              error={!!touched.mailSubject && !!errors.mailSubject}
              helperText={(touched.mailSubject && errors.mailSubject) || 'Write your Subject'}
              {...getFieldProps('mailSubject')}
            />
            <TextField
              multiline
              rows={6}
              rowsMax={12}
              name="Body"
              id="Body"
              variant="outlined"
              margin="dense"
              label="Message For Admin"
              className={classes.inputField}
              error={!!touched.mailBody && !!errors.mailBody}
              helperText={(touched.mailBody && errors.mailBody) || 'Write mail body'}
              {...getFieldProps('mailBody')}
            />
            <FormControlLabel
              control={<Checkbox color="primary" name="hasMail" checked={values.hasMail} onChange={handleChangeMail} />}
              label="Send Mail"
            />
          </div>
          <Typography className={classes.disclaimer} variant="subtitle2">
            Note : You can uncheck 'Send Mail' and submit an empty form. Your request will still be registered.
          </Typography>
          <div className={classes.buttonField}>
            <Button
              type="reset"
              variant="contained"
              color="secondary"
              className={classes.cancelButton}
              disableElevation
            >
              <Typography variant="button">Cancel</Typography>
            </Button>
            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disableElevation>
              <Typography variant="button">Submit</Typography>
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}

export default BecomeAnAuthor
