import React, { Fragment, useState } from 'react'
import { Header } from '../../components'
import { FormDialog, Sidebar } from '../../components'

const MainLayout = (props) => {
  const { children } = props
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <Fragment>
      <FormDialog isOpen={isFormDialogOpen} setIsOpen={setIsFormDialogOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Header setIsDialogOpen={setIsFormDialogOpen} setIsSidebarOpen={setIsSidebarOpen} />
      {children}
    </Fragment>
  )
}

export default MainLayout
