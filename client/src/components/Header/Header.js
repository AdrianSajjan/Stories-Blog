import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Menu as MenuIcon } from '@material-ui/icons'
import { AppBar, Toolbar, Button, Typography, IconButton, Link, Menu, MenuItem, Container } from '@material-ui/core'
import { ExitToApp, AccountBox, Create } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { navLinks } from '../../constants'
import { toggleSidebar, toggleFormDialog } from '../../actions'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.grey[50]
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
    color: 'black',
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

  const LoginButton = () => (
    <Button variant="outlined" className={classes.hideSm} onClick={handleFormDialogOpen}>
      <Typography variant="button">Login</Typography>
    </Button>
  )

  const CategoriesButton = () => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    return (
      <div>
        <Button className={classes.hideSm} onClick={handleClick}>
          <Typography variant="button">Categories</Typography>
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
          {navLinks.map((link) => (
            <MenuItem component={RouterLink} key={link.id} to={link.url} color="inherit">
              {link.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }

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
          <Typography variant="button">Account</Typography>
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
          <MenuItem component={RouterLink} to={isAuthor ? '/author' : '/become-an-author'}>
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

  const SidebarButton = () => (
    <IconButton className={classes.showSm} onClick={handleSidebarOpen}>
      <MenuIcon />
    </IconButton>
  )

  const StoriesLogo = () => (
    <Typography variant="h5" className={classes.toolbarTitle}>
      <Link component={RouterLink} to="/" className={classes.toolbarTitleLink}>
        STORIES! Blog
      </Link>
    </Typography>
  )

  return (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Container maxWidth="md" className={classes.mainContainer}>
          <Toolbar component="header" className={classes.mainToolbar}>
            <CategoriesButton />
            <SidebarButton />
            <StoriesLogo />
            {isAuthenticated ? <AccountButton /> : <LoginButton />}
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  )
}

export default Header
