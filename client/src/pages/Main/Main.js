import React from 'react'
import { Container } from '@material-ui/core'
import { FeaturedBlog, RecentPosts } from '../../components'

const Main = () => {
  return (
    <Container>
      <FeaturedBlog />
      <RecentPosts />
    </Container>
  )
}

export default Main
