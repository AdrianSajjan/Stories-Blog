import React from 'react'
import { Container } from '@material-ui/core'
import { FeaturedBlog, RecentPosts, CategoryPosts } from '../../components'

const Main = () => {
  return (
    <Container>
      <FeaturedBlog />
      <RecentPosts />
      <CategoryPosts />
    </Container>
  )
}

export default Main
