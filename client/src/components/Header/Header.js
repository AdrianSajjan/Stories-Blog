import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Menu as MenuIcon } from '@material-ui/icons'
import { Toolbar, Button, Typography, IconButton, Link, Menu, MenuItem, Container } from '@material-ui/core'
import { ExitToApp, AccountBox, Create } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { navLinks } from '../../constants'
import { toggleSidebar, toggleFormDialog, toggleSubscribeDialog } from '../../actions'

const useStyles = makeStyles((theme) => ({
  mainToolbar: {
    borderBottom: ['1px', 'solid', theme.palette.divider].join(' ')
  },
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toolbarTitle: {
    flex: 1,
    fontFamily: ['Metal Mania', 'monospace'].join(','),
    letterSpacing: 1,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      marginLeft: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center'
    }
  },
  toolbarTitleLink: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  hideSm: {
    [theme.breakpoints.up('xs')]: {
      display: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  showSm: {
    [theme.breakpoints.up('xs')]: {
      display: 'block'
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbarNav: {
    borderBottom: ['1px', 'solid', theme.palette.divider].join(' '),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    overflowX: 'auto'
  },
  accountIcons: {
    marginRight: theme.spacing(1.5)
  }
}))

const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const isAuthor = useSelector((state) => state.user.isAuthor)

  const handleFormDialogOpen = () => {
    dispatch(toggleFormDialog(true))
  }

  const handleSidebarOpen = () => {
    dispatch(toggleSidebar(true))
  }

  const handleSubscribeDialog = () => {
    dispatch(toggleSubscribeDialog(true))
  }

  const LoginButton = () => (
    <Button variant="outlined" className={classes.hideSm} onClick={handleFormDialogOpen}>
      <Typography variant="button">Login</Typography>
    </Button>
  )

  const AccountButton = () => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    return (
      <div>
        <Button variant="outlined" className={classes.hideSm} onClick={handleClick}>
          Account
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
          <MenuItem component={RouterLink} to={isAuthor ? '/author' : '/became-an-author'}>
            <Create fontSize="small" className={classes.accountIcons} />
            <span>{isAuthor ? 'Author' : 'Become an Author'}</span>
          </MenuItem>
          <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
            <AccountBox fontSize="small" className={classes.accountIcons} />
            <span>Profile</span>
          </MenuItem>
          <MenuItem component={RouterLink} to="/logout" onClick={handleClose}>
            <ExitToApp fontSize="small" className={classes.accountIcons} />
            <span>Logout</span>
          </MenuItem>
        </Menu>
      </div>
    )
  }

  return (
    <Fragment>
      <Toolbar component="header" className={classes.mainToolbar}>
        <Container maxWidth="md" className={classes.mainContainer}>
          <Button className={classes.hideSm} onClick={handleSubscribeDialog}>
            <Typography variant="button">Subscribe</Typography>
          </Button>

          <IconButton className={classes.showSm} onClick={handleSidebarOpen}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h5" className={classes.toolbarTitle}>
            <Link component={RouterLink} color="inherit" to="/" className={classes.toolbarTitleLink}>
              STORIES! Blog
            </Link>
          </Typography>

          {isAuthenticated ? <AccountButton /> : <LoginButton />}
        </Container>
      </Toolbar>

      <Toolbar component="nav" variant="dense" className={classes.toolbarNav}>
        <Container maxWidth="md" className={classes.navContainer}>
          {navLinks.map((link) => (
            <Link component={RouterLink} key={link.id} to={link.url} color="inherit">
              {link.name}
            </Link>
          ))}
        </Container>
      </Toolbar>
    </Fragment>
  )
}

export default Header
