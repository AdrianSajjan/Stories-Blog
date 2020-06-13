import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@material-ui/core/'
import { ThumbDown, ThumbUp, Person, Category } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    height: 200
  },
  subtitleText: {
    marginBottom: theme.spacing(2)
  },
  infoText: {
    position: 'relative'
  },
  voteText: {
    position: 'relative'
  },
  avatarIcon: {
    position: 'absolute',
    left: 0
  },
  categoryIcon: {
    position: 'absolute',
    left: 0
  },
  avatarText: {
    marginLeft: 30
  },
  categoryText: {
    marginLeft: 30
  },
  thumbUpIcon: {
    position: 'absolute',
    right: theme.spacing(3),
    top: -3
  },
  thumbDownIcon: {
    position: 'absolute',
    right: theme.spacing(3),
    top: 3
  }
}))

const BlogCard = () => {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = (event) => {
    history.push('/')
  }

  return (
    <Card>
      <CardActionArea role="button" onClick={handleClick}>
        <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title="Random Image" />
        <CardContent>
          <Typography gutterBottom variant="h5">
            Lizard
          </Typography>
          <Typography variant="body1" color="textSecondary" className={classes.subtitleText}>
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
            except Antarctica
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body1" color="primary" className={classes.infoText} gutterBottom>
                <Person className={classes.avatarIcon} />
                <span className={classes.avatarText}>Adrian</span>
              </Typography>
              <Typography variant="body1" color="primary" className={classes.infoText}>
                <Category className={classes.categoryIcon} />
                <span className={classes.categoryText}>Technology</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary" align="right" className={classes.voteText} gutterBottom>
                <ThumbUp className={classes.thumbUpIcon} /> 8
              </Typography>
              <Typography variant="body1" color="textSecondary" align="right" className={classes.voteText}>
                <ThumbDown className={classes.thumbDownIcon} /> 0
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default BlogCard
