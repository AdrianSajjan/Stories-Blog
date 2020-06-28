import React, { Fragment } from 'react'
import clsx from 'clsx'
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import { makeStyles } from '@material-ui/styles'
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Email as EmailIcon,
  Search as SearchIcon,
  Assignment as AssignmentIcon,
  Category as CategoryIcon
} from '@material-ui/icons/'

const categories = ({ iconStyles }) => [
  {
    id: 'Users',
    children: [
      { id: 'Search', icon: <SearchIcon className={iconStyles} />, active: true },
      { id: 'Authors', icon: <PeopleIcon className={iconStyles} /> },
      { id: 'Mailbox', icon: <EmailIcon className={iconStyles} /> }
    ]
  },
  {
    id: 'Posts',
    children: [
      { id: 'Search', icon: <SearchIcon className={iconStyles} />, active: true },
      { id: 'Categories', icon: <CategoryIcon className={iconStyles} /> },
      { id: 'Recents', icon: <AssignmentIcon className={iconStyles} /> }
    ]
  }
]

const useStyles = makeStyles((theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white
  },
  itemActiveItem: {
    color: '#4fc3f7'
  },
  itemPrimary: {
    fontSize: 'inherit'
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2)
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

const Sidebar = ({ ...props }) => {
  const styles = useStyles()

  return (
    <Drawer variant="permanent" {...props}>
      <List disablePadding>
        <ListItem className={clsx(styles.firebase, styles.item, styles.itemCategory)}>Stories! Blog</ListItem>
        <ListItem className={clsx(styles.item, styles.itemCategory)}>
          <ListItemIcon className={styles.itemIcon}>
            <HomeIcon className={styles.icons} />
          </ListItemIcon>
          <ListItemText classes={{ primary: styles.itemPrimary }}>Dashboard</ListItemText>
        </ListItem>
        {categories({ iconStyles: styles.icons }).map(({ id, children }) => (
          <Fragment key={id}>
            <ListItem className={styles.categoryHeader}>
              <ListItemText classes={{ primary: styles.categoryHeaderPrimary }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem key={childId} button className={clsx(styles.item, active && styles.itemActiveItem)}>
                <ListItemIcon className={styles.itemIcon}>{icon}</ListItemIcon>
                <ListItemText classes={{ primary: styles.itemPrimary }}>{childId}</ListItemText>
              </ListItem>
            ))}
            <Divider className={styles.divider} />
          </Fragment>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
