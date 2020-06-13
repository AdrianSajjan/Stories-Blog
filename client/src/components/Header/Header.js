import React, { Fragment, useState } from 'react'
import { Menu as MenuIcon } from '@material-ui/icons'
import { Toolbar, Button, Typography, IconButton, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FormDialog } from '../'

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
  }
}))

const Header = () => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <Fragment>
      <FormDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <Toolbar component="header" className={classes.mainToolbar}>
        <Button className={classes.hideSm}>
          <Typography variant="button">Subscribe</Typography>
        </Button>

        <IconButton className={classes.showSm}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h5" className={classes.toolbarTitle}>
          <Link color="inherit" href="/" className={classes.toolbarTitleLink}>
            STORIES! Blog
          </Link>
        </Typography>

        <Button variant="outlined" className={classes.hideSm} onClick={handleOpen}>
          <Typography variant="button">Login</Typography>
        </Button>
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

const navLinks = [
  {
    id: 1,
    name: 'Sports',
    url: '#'
  },
  {
    id: 2,
    name: 'Food',
    url: '#'
  },
  {
    id: 3,
    name: 'Technology',
    url: '#'
  },
  {
    id: 4,
    name: 'Travel',
    url: '#'
  },
  {
    id: 5,
    name: 'Style',
    url: '#'
  },
  {
    id: 6,
    name: 'Health',
    url: '#'
  }
]

export default Header
