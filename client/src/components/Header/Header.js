import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { Menu as MenuIcon } from '@material-ui/icons'
import { Toolbar, Button, Typography, IconButton, Link, Menu, MenuItem } from '@material-ui/core'
import { ExitToApp, AccountBox, Create } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { navLinks } from '../../constants'

const useStyles = makeStyles((theme) => ({
  mainToolbar: {
    borderBottom: ['1px', 'solid', theme.palette.divider].join(' ')
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
    justifyContent: 'space-between',
    borderBottom: ['1px', 'solid', theme.palette.divider].join(' '),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  accountIcons: {
    marginRight: theme.spacing(1.5)
  }
}))

const Header = (props) => {
  const { setFormDialogOpen, setSidebarOpen, setAuthorDialogOpen, setSubscribeDialogOpen } = props
  const classes = useStyles()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const isAuthor = useSelector((state) => state.user.isAuthor)

  const handleFormDialogOpen = () => {
    setFormDialogOpen(true)
  }

  const handleSidebarOpen = () => {
    setSidebarOpen(true)
  }

  const handleSubscribeDialog = () => {
    setSubscribeDialogOpen(true)
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

    const handleAuthorDialog = () => {
      setAuthorDialogOpen(true)
    }

    return (
      <div>
        <Button variant="outlined" className={classes.hideSm} onClick={handleClick}>
          Account
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
          <MenuItem onClick={isAuthor ? handleClose : handleAuthorDialog}>
            <Create fontSize="small" className={classes.accountIcons} />
            <span>{isAuthor ? 'Author' : 'Become an Author'}</span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <AccountBox fontSize="small" className={classes.accountIcons} />
            <span>Profile</span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
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
        <Button className={classes.hideSm} onClick={handleSubscribeDialog}>
          <Typography variant="button">Subscribe</Typography>
        </Button>

        <IconButton className={classes.showSm} onClick={handleSidebarOpen}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h5" className={classes.toolbarTitle}>
          <Link color="inherit" href="/" className={classes.toolbarTitleLink}>
            STORIES! Blog
          </Link>
        </Typography>

        {isAuthenticated ? <AccountButton /> : <LoginButton />}
      </Toolbar>

      <Toolbar component="nav" variant="dense" className={classes.toolbarNav}>
        {navLinks.map((link) => (
          <Link key={link.id} href={link.url} color="inherit">
            {link.name}
          </Link>
        ))}
      </Toolbar>
    </Fragment>
  )
}

export default Header
