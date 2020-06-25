import React, { Fragment, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { SwipeableDrawer, List, ListItem, ListItemText, Collapse, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ExpandLess, ExpandMore, Create, AccountBox, ExitToApp } from '@material-ui/icons'
import { navLinks } from '../../constants'
import { toggleSidebar, toggleFormDialog } from '../../actions'

const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    width: 250
  },
  drawerTitle: {
    fontFamily: 'Metal Mania',
    letterSpacing: 1.5
  },
  nestedList: {
    paddingLeft: theme.spacing(4)
  },
  accountOptions: {
    marginLeft: theme.spacing(1.5)
  }
}))

const Sidebar = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const isOpen = useSelector((state) => state.misc.sidebarOpen)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const isAuthor = useSelector((state) => state.user.isAuthor)

  const handleFormDialog = () => {
    handleClose()
    dispatch(toggleFormDialog(true))
  }

  const handleClose = () => {
    dispatch(toggleSidebar(false))
  }

  const handleOpen = () => {
    dispatch(toggleSidebar(true))
  }

  const LoginButton = () => {
    return (
      <ListItem button>
        <ListItemText primary="Login" onClick={handleFormDialog} primaryTypographyProps={{ variant: 'body1' }} />
      </ListItem>
    )
  }

  const AccountOption = () => {
    const [accountOpen, setAccountOpen] = useState(false)

    const toggleAccount = () => {
      setAccountOpen((prev) => !prev)
    }

    const getUrl = () => (isAuthor ? '/author' : '/become-an-author')

    return (
      <Fragment>
        <ListItem button onClick={toggleAccount}>
          <ListItemText primary="Account" primaryTypographyProps={{ variant: 'body1' }} />
          {accountOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={accountOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={RouterLink} to={getUrl()} className={classes.nestedList} onClick={handleClose}>
              <Create fontSize="small" />
              <ListItemText className={classes.accountOptions} disableTypography>
                <Typography variant="body1">{isAuthor ? 'Author' : 'Become an Author'}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem button component={RouterLink} to="/profile" className={classes.nestedList} onClick={handleClose}>
              <AccountBox fontSize="small" />
              <ListItemText className={classes.accountOptions} disableTypography>
                <Typography variant="body1">Profile</Typography>
              </ListItemText>
            </ListItem>
            <ListItem button component={RouterLink} to="/logout" className={classes.nestedList} onClick={handleClose}>
              <ExitToApp fontSize="small" />
              <ListItemText className={classes.accountOptions} disableTypography>
                <Typography variant="body1">Logout</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Collapse>
      </Fragment>
    )
  }

  const CategoryOptions = () => {
    const [categoriesOpen, setCategoriesOpen] = useState(false)

    const toggleCategories = () => {
      setCategoriesOpen((prev) => !prev)
    }

    return (
      <Fragment>
        <ListItem button onClick={toggleCategories}>
          <ListItemText primary="Categories" primaryTypographyProps={{ variant: 'body1' }} />
          {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {navLinks.map((link) => (
              <ListItem
                button
                component={RouterLink}
                to={link.url}
                key={link.id}
                className={classes.nestedList}
                onClick={handleClose}
              >
                <ListItemText primary={link.name} primaryTypographyProps={{ variant: 'body1' }} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Fragment>
    )
  }

  const StoriesLogo = () => (
    <ListItem>
      <ListItemText disableTypography>
        <Typography variant="h5" className={classes.drawerTitle}>
          Stories! Blog
        </Typography>
      </ListItemText>
    </ListItem>
  )

  return (
    <Fragment>
      <SwipeableDrawer open={isOpen} onClose={handleClose} anchor="left" onOpen={handleOpen}>
        <div className={classes.drawerContainer}>
          <List>
            <StoriesLogo />
            {!isAuthenticated ? <LoginButton /> : <AccountOption />}
            <CategoryOptions />
          </List>
        </div>
      </SwipeableDrawer>
    </Fragment>
  )
}

export default Sidebar
