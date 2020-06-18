import React, { Fragment, useState } from 'react'
import { SwipeableDrawer, List, ListItem, ListItemText, Collapse } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
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
  }
}))

const Sidebar = ({ isOpen, setIsOpen, setFormDialogOpen }) => {
  const classes = useStyles()

  const [categoriesOpen, setCategoriesOpen] = useState(false)

  const toggleCategories = () => {
    setCategoriesOpen((prev) => !prev)
  }

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
            <ListItem button>
              <ListItemText primary="Login" onClick={handleFormDialog} primaryTypographyProps={{ variant: 'h6' }} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Subscribe" primaryTypographyProps={{ variant: 'h6' }} />
            </ListItem>
            <ListItem button onClick={toggleCategories}>
              <ListItemText primary="Categories" primaryTypographyProps={{ variant: 'h6' }} />
              {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {navLinks.map((link) => (
                  <ListItem button component="a" href={link.url} key={link.id} className={classes.nestedList}>
                    <ListItemText primary={link.name} primaryTypographyProps={{ variant: 'h6' }} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </div>
      </SwipeableDrawer>
    </Fragment>
  )
}

export default Sidebar
