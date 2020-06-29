import React, { Fragment } from 'react'
import clsx from 'clsx'
import { useRouteMatch, Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { Hidden, List, ListItem, ListItemText, ListItemIcon, Typography, Divider } from '@material-ui/core/'
import { makeStyles, useTheme } from '@material-ui/styles'
import { toggleSidebar } from '../../actions'
import { sidebarCategories } from '../../constants'

const useStyles = makeStyles((theme) => ({
  storiesLogo: {
    backgroundColor: '#232f3e',
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: ['0px', '1px', '2px', 'rgba(128, 128, 128, 0.5)'].join(' ')
  },
  storiesLogoText: {
    color: theme.palette.common.white,
    fontFamily: ['Metal Mania', 'cursive'].join(',')
  },
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1)
  },
  categoryHeaderText: {
    color: theme.palette.common.white,
    fontWeight: 600
  },
  item: {
    paddingTop: 2,
    paddingBottom: 2,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  itemPrimary: {
    fontSize: 'inherit',
    color: theme.palette.common.white,
    fontWeight: 600
  },
  itemIcon: {
    minWidth: 'auto',
    color: theme.palette.common.white,
    marginRight: theme.spacing(2)
  },
  itemActive: {
    color: '#4fc3f7'
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  icons: {
    color: theme.palette.common.white,
    width: 20,
    height: 20
  }
}))

const MobileSidebar = ({ styles, open, onOpen, onClose, paperProps, children }) => {
  return (
    <SwipeableDrawer variant="temporary" open={open} onOpen={onOpen} onClose={onClose} PaperProps={paperProps}>
      {children}
    </SwipeableDrawer>
  )
}

const DesktopSidebar = ({ styles, children, paperProps }) => {
  return (
    <Drawer variant="permanent" PaperProps={paperProps}>
      {children}
    </Drawer>
  )
}

const StoriesLogo = ({ styles }) => {
  return (
    <ListItem className={styles.storiesLogo}>
      <ListItemText disableTypography>
        <Typography variant="h5" className={styles.storiesLogoText}>
          Stories! Blog
        </Typography>
      </ListItemText>
    </ListItem>
  )
}

const CategoryList = ({ styles }) => {
  return sidebarCategories.map(({ name, children }) => (
    <Fragment key={name}>
      <ListItem className={styles.categoryHeader}>
        <ListItemText disableTypography>
          <Typography className={styles.categoryHeaderText}>{name}</Typography>
        </ListItemText>
      </ListItem>
      {children.map(({ name, icon, route }) => (
        <CategorySublist key={name} name={name} icon={icon} route={route} styles={styles} />
      ))}
      <Divider className={styles.divider} />
    </Fragment>
  ))
}

const CategorySublist = ({ name, icon, route, styles }) => {
  const match = useRouteMatch({ path: route, strict: false, sensitive: false })

  return (
    <Fragment>
      <ListItem button component={RouterLink} to={route} className={styles.item}>
        <ListItemIcon className={clsx(styles.itemIcon, { [styles.itemActive]: match })}>{icon}</ListItemIcon>
        <ListItemText disableTypography>
          <Typography className={clsx(styles.itemPrimary, { [styles.itemActive]: match })}>{name}</Typography>
        </ListItemText>
      </ListItem>
    </Fragment>
  )
}

const SidebarList = ({ styles }) => {
  return (
    <List disablePadding>
      <StoriesLogo styles={styles} />
      <CategoryList styles={styles} />
    </List>
  )
}

const Sidebar = () => {
  const styles = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()

  const isOpen = useSelector((state) => state.misc.mobileSidebarOpen)
  const handleOpen = () => dispatch(toggleSidebar(true))
  const handleClose = () => dispatch(toggleSidebar(false))

  const paperProps = { style: { width: theme.spacing(32) } }

  return (
    <Fragment>
      <Hidden smUp implementation="js">
        <MobileSidebar open={isOpen} onOpen={handleOpen} onClose={handleClose} paperProps={paperProps}>
          <SidebarList styles={styles} />
        </MobileSidebar>
      </Hidden>
      <Hidden xsDown implementation="css">
        <DesktopSidebar paperProps={paperProps}>
          <SidebarList styles={styles} />
        </DesktopSidebar>
      </Hidden>
    </Fragment>
  )
}

export default Sidebar
