import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { AppBar, Avatar, Grid, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core/'
import { Menu as MenuIcon } from '@material-ui/icons/'
import { makeStyles } from '@material-ui/core/styles'
import { toggleSidebar } from '../../actions'

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center'
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuButton: {
    marginLeft: -theme.spacing(1)
  },
  storiesLogo: {
    color: theme.palette.common.white,
    fontFamily: ['Metal Mania', 'cursive'].join(','),
    marginLeft: theme.spacing(1)
  },
  iconButtonAvatar: {
    padding: theme.spacing(0.1),
    marginLeft: theme.spacing(1.5)
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: 'rgba(255, 255, 255, 0.7)'
  }
}))

const Header = () => {
  const styles = useStyles()
  const dispatch = useDispatch()

  const handleSidebarToggle = () => dispatch(toggleSidebar(null, true))

  return (
    <Fragment>
      <AppBar colot="primary" position="sticky" elevation={1} className={styles.appBar}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center" justify="space-between">
            <Hidden smUp>
              <Grid item className={styles.gridItem}>
                <IconButton color="inherit" className={styles.menuButton} onClick={handleSidebarToggle}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h5" className={styles.storiesLogo}>
                  Stories! Blog
                </Typography>
              </Grid>
            </Hidden>
            <Hidden xsDown>
              <Grid item />
            </Hidden>
            <Grid item className={styles.gridItem}>
              <Hidden xsDown>
                <Typography variant="subtitle2">Hi, Adrian</Typography>
              </Hidden>
              <IconButton color="inherit" className={styles.iconButtonAvatar}>
                <Avatar>A</Avatar>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default Header
