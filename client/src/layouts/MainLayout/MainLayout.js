import React, { Fragment, useState } from 'react'
import { Header } from '../../components'
import { FormDialog, Sidebar, AuthorDialog } from '../../components'

const MainLayout = (props) => {
  const { children } = props
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAuthorDialogOpen, setIsAuthorDialogOpen] = useState(false)

  return (
    <Fragment>
      <FormDialog isOpen={isFormDialogOpen} setIsOpen={setIsFormDialogOpen} />
      <AuthorDialog isOpen={isAuthorDialogOpen} setIsOpen={setIsAuthorDialogOpen} />
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        setFormDialogOpen={setIsFormDialogOpen}
        setAuthorDialogOpen={setIsAuthorDialogOpen}
      />
      <Header
        setFormDialogOpen={setIsFormDialogOpen}
        setSidebarOpen={setIsSidebarOpen}
        setAuthorDialogOpen={setIsAuthorDialogOpen}
      />
      {children}
    </Fragment>
  )
}

export default MainLayout
