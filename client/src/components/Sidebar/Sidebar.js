import React, { Fragment } from 'react'
import { SwipeableDrawer, Typography } from '@material-ui/core'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Fragment>
      <SwipeableDrawer open={isOpen} onClose={handleClose} anchor="left">
        <Typography>Drawer</Typography>
      </SwipeableDrawer>
    </Fragment>
  )
}

export default Sidebar
