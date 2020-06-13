import React from 'react'
import { Container } from '@material-ui/core'
import { FeaturedBlog, RecentPosts } from '../'

const Main = () => {
  return (
    <Container>
      <FeaturedBlog />
      <RecentPosts />
    </Container>
  )
}

export default Main
