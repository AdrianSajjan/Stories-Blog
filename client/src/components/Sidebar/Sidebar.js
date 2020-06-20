import React, { Fragment, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SwipeableDrawer, List, ListItem, ListItemText, Collapse } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ExpandLess, ExpandMore, Create, AccountBox, ExitToApp } from '@material-ui/icons'
import { navLinks } from '../../constants'

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
  const { isOpen, setIsOpen, setFormDialogOpen, setAuthorDialogOpen, setSubscribeDialogOpen } = props
  const classes = useStyles()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const isAuthor = useSelector((state) => state.user.isAuthor)

  const handleFormDialog = () => {
    handleClose()
    setFormDialogOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleAuthorDialog = (event) => {
    if (!isAuthor) {
      event.preventDefault()
      setAuthorDialogOpen(true)
    }
  }

  const handleSubscribeDialog = () => {
    setSubscribeDialogOpen(true)
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

    return (
      <Fragment>
        <ListItem button onClick={toggleAccount}>
          <ListItemText primary="Account" primaryTypographyProps={{ variant: 'body1' }} />
          {accountOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={accountOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              component={RouterLink}
              to="/author"
              className={classes.nestedList}
              onClick={handleAuthorDialog}
            >
              <Create fontSize="small" />
              <ListItemText
                className={classes.accountOptions}
                primary={isAuthor ? 'Author' : 'Become an Author'}
                primaryTypographyProps={{ variant: 'body1' }}
              />
            </ListItem>
            <ListItem button component={RouterLink} to="/profile" className={classes.nestedList}>
              <AccountBox fontSize="small" />
              <ListItemText
                className={classes.accountOptions}
                primary="Profile"
                primaryTypographyProps={{ variant: 'body1' }}
              />
            </ListItem>
            <ListItem button component={RouterLink} to="/logout" className={classes.nestedList}>
              <ExitToApp fontSize="small" />
              <ListItemText
                className={classes.accountOptions}
                primary="Logout"
                primaryTypographyProps={{ variant: 'body1' }}
              />
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
              <ListItem button component={RouterLink} to={link.url} key={link.id} className={classes.nestedList}>
                <ListItemText primary={link.name} primaryTypographyProps={{ variant: 'body1' }} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <SwipeableDrawer open={isOpen} onClose={handleClose} anchor="left" onOpen={handleOpen}>
        <div className={classes.drawerContainer}>
          <List>
            <ListItem>
              <ListItemText
                primary="Stories! Blog"
                primaryTypographyProps={{ variant: 'h5', className: classes.drawerTitle }}
              />
            </ListItem>
            {!isAuthenticated ? <LoginButton /> : <AccountOption />}
            <ListItem button onClick={handleSubscribeDialog}>
              <ListItemText primary="Subscribe" primaryTypographyProps={{ variant: 'body1' }} />
            </ListItem>
            <CategoryOptions />
          </List>
        </div>
      </SwipeableDrawer>
    </Fragment>
  )
}

export default Sidebar
