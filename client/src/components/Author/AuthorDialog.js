import React from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1.5)
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
  actionContent: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.75)
  },
  mailButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1.5)
  },
  closeButton: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1)
  }
}))

const AuthorDialog = ({ isOpen, setIsOpen }) => {
  const classes = useStyles()

  const handleClose = () => {
    setIsOpen(false)
  }

  const sendMail = () => {
    window.location.href = 'mailto:adriansajjan2001@gmail.com'
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} classes={{ paper: classes.paper }}>
      <DialogTitle disableTypography>
        <Typography align="center" className={classes.dialogTitleText}>
          Become An Author
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          You are not an author yet. To become an author mail the admin and mention your skillsets and the category you
          are adept at. The posts should be aditionally error free and should have a good amount of content.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.actionContent}>
        <Button className={classes.closeButton} color="secondary" onClick={handleClose} disableElevation fullWidth>
          Close
        </Button>
        <Button
          className={classes.mailButton}
          variant="contained"
          color="primary"
          onClick={sendMail}
          disableElevation
          fullWidth
        >
          Send Mail
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AuthorDialog
