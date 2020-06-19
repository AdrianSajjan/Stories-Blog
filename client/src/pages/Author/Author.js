import React from 'react'
import { useSelector } from 'react-redux'

const Author = () => {
  const isAuthor = useSelector((state) => state.user.isAuthor)

  if (!isAuthor) return null
}

export default Author
