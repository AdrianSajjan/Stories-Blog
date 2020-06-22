import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  cardMedia: {
    height: 200
  }
})

const MarkdownCard = () => {
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea component={RouterLink} to="/author/create">
        <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title="Random Image" />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Markdown
          </Typography>
          <Typography>Create a Post using custom markdown or HTML.</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MarkdownCard
