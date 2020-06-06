import React from 'react'
import { Toolbar, Button, Typography, IconButton, Divider, makeStyles } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  toolbarTitle: {
    flex: 1,
    fontFamily: 'Metal Mania'
  },
  toolbarSearchIcon: {
    marginRight: 10
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <>
      <Toolbar>
        <Button>
          <Typography variant="button">Subscribe</Typography>
        </Button>
        <Typography variant="h5" align="center" className={classes.toolbarTitle}>
          STORIES! Blog
        </Typography>
        <IconButton className={classes.toolbarSearchIcon}>
          <SearchOutlined />
        </IconButton>
        <Button variant="outlined">
          <Typography variant="button">Login</Typography>
        </Button>
      </Toolbar>
      <Divider />
    </>
  )
}

export default Header
