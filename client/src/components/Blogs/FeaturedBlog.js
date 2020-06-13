import React, { Fragment } from 'react'
import { Card, CardActionArea, CardContent, Typography, Grid } from '@material-ui/core'
import { Person, Category } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  postBanner: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(3)
    }
  },
  actionArea: {
    padding: [`${theme.spacing(1)}px`, '0'].join(' '),
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://source.unsplash.com/random)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
    minHeight: 280
  },
  cardContent: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  postTitle: {
    color: '#ffffff',
    [theme.breakpoints.up('xs')]: {
      fontSize: '2rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem'
    },
    marginBottom: theme.spacing(1)
  },
  postSubtitle: {
    color: '#ffffff',
    [theme.breakpoints.up('xs')]: {
      fontSize: '1rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.1rem'
    },
    marginBottom: theme.spacing(1.5)
  },
  postAuthor: {
    color: '#ffffff'
  },
  postCategory: {
    color: '#ffffff'
  },
  infoText: {
    position: 'relative'
  },
  avatarIcon: {
    position: 'absolute',
    left: 0,
    color: '#ffffff'
  },
  categoryIcon: {
    position: 'absolute',
    left: 0,
    color: '#ffffff'
  },
  avatarText: {
    marginLeft: 30,
    color: '#ffffff'
  },
  categoryText: {
    marginLeft: 30,
    color: '#ffffff'
  }
}))

const FeaturedBlog = () => {
  const classes = useStyles()

  return (
    <Fragment>
      <Card className={classes.postBanner}>
        <CardActionArea className={classes.actionArea}>
          <Grid container>
            <Grid item md={8}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.postTitle}>Lizard</Typography>
                <Typography className={classes.postSubtitle}>
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                  continents except Antarctica
                </Typography>
                <Typography variant="body1" className={classes.infoText} gutterBottom>
                  <Person className={classes.avatarIcon} />
                  <span className={classes.avatarText}>Adrian</span>
                </Typography>
                <Typography variant="body1" className={classes.infoText}>
                  <Category className={classes.categoryIcon} />
                  <span className={classes.categoryText}>Technology</span>
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Fragment>
  )
}

export default FeaturedBlog
