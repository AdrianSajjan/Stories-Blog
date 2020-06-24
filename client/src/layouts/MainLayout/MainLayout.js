import React, { Fragment, useState } from 'react'
import { Header } from '../../components'
import { FormDialog, Sidebar } from '../../components'

const MainLayout = (props) => {
  const { children } = props
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(false)

  return (
    <Fragment>
      <FormDialog isOpen={isFormDialogOpen} setIsOpen={setIsFormDialogOpen} />
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        setFormDialogOpen={setIsFormDialogOpen}
        setSubscribeDialogOpen={setIsSubscribeDialogOpen}
      />
      <Header
        setFormDialogOpen={setIsFormDialogOpen}
        setSidebarOpen={setIsSidebarOpen}
        setSubscribeDialogOpen={setIsSubscribeDialogOpen}
      />
      {children}
    </Fragment>
  )
}

export default MainLayout
