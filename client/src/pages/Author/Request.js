import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { TextField, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  pageStart: {
    marginTop: theme.spacing(5)
  },
  pageTitle: {
    fontFamily: "'Metal Mania', cursive"
  },
  inputFields: {
    display: 'flex',
    flexDirection: 'column'
  },
  inputField: {
    marginTop: theme.spacing(2)
  },
  buttonField: {
    marginTop: theme.spacing(1),
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

  return (
    <Fragment>
      <div className={classes.pageStart}>
        <Typography align="center" variant="h5" className={classes.pageTitle} gutterBottom>
          Become An Author
        </Typography>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={classes.inputFields}>
            <TextField
              name="name"
              id="name"
              label="Name"
              variant="outlined"
              margin="dense"
              helperText="Enter your full name"
              className={classes.inputField}
            />
            <TextField
              name="expertise"
              id="expertise"
              label="Area Of Expertise"
              variant="outlined"
              margin="dense"
              helperText="Enter your area of expertise"
              className={classes.inputField}
            />
            <TextField
              multiline
              rows={6}
              rowsMax={12}
              name="message"
              id="message"
              variant="outlined"
              margin="dense"
              label="Message For Admin"
              helperText="Leave a short note for the admin"
              className={classes.inputField}
            />
          </div>
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
