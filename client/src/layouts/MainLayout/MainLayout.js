import React, { Fragment } from 'react'
import { Header } from '../../components'

const MainLayout = (props) => {
  const { children } = props
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  )
}

export default MainLayout
