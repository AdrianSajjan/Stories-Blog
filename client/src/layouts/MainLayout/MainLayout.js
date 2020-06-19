import React, { Fragment, useState } from 'react'
import { Header } from '../../components'
import { FormDialog, Sidebar, AuthorDialog, SubscribeDialog } from '../../components'

const MainLayout = (props) => {
  const { children } = props
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAuthorDialogOpen, setIsAuthorDialogOpen] = useState(false)
  const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(false)

  return (
    <Fragment>
      <FormDialog isOpen={isFormDialogOpen} setIsOpen={setIsFormDialogOpen} />
      <AuthorDialog isOpen={isAuthorDialogOpen} setIsOpen={setIsAuthorDialogOpen} />
      <SubscribeDialog isOpen={isSubscribeDialogOpen} setIsOpen={setIsSubscribeDialogOpen} />
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        setFormDialogOpen={setIsFormDialogOpen}
        setAuthorDialogOpen={setIsAuthorDialogOpen}
        setSubscribeDialogOpen={setIsSubscribeDialogOpen}
      />
      <Header
        setFormDialogOpen={setIsFormDialogOpen}
        setSidebarOpen={setIsSidebarOpen}
        setAuthorDialogOpen={setIsAuthorDialogOpen}
        setSubscribeDialogOpen={setIsSubscribeDialogOpen}
      />
      {children}
    </Fragment>
  )
}

export default MainLayout
