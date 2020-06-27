import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Hidden,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  Link
} from '@material-ui/core/'
import { Menu as MenuIcon, Notifications as NotificationsIcon, Help as HelpIcon } from '@material-ui/icons/'
import { makeStyles } from '@material-ui/core/styles'

const lightColor = 'rgba(255, 255, 255, 0.7)'

const useStyles = makeStyles((theme) => ({
  secondaryBar: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: -theme.spacing(1)
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  }
}))

const Header = ({ onDrawerToggle }) => {
  const styles = useStyles()

  return (
    <Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton color="inherit" onClick={onDrawerToggle} className={styles.menuButton}>
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Link className={styles.link} href="#" variant="body2">
                Go to docs
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={styles.iconButtonAvatar}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" className={styles.secondaryBar} color="primary" position="static" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Authentication
              </Typography>
            </Grid>
            <Grid item>
              <Button className={styles.button} variant="outlined" color="inherit" size="small">
                Web setup
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" className={styles.secondaryBar} color="primary" position="static" elevation={0}>
        <Tabs value={0} textColor="inherit">
          <Tab textColor="inherit" label="Users" />
          <Tab textColor="inherit" label="Sign-in method" />
          <Tab textColor="inherit" label="Templates" />
          <Tab textColor="inherit" label="Usage" />
        </Tabs>
      </AppBar>
    </Fragment>
  )
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired
}

export default Header
