import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Card, CardActionArea, CardContent, Typography, Grid, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  cardActionArea: {
    padding: [`${theme.spacing(1)}px`, '0'].join(' '),
    backgroundImage: [
      `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))`,
      `url(https://img5.goodfon.com/wallpaper/nbig/b/12/tree-hill-silhouette-man-starry-sky-dark-purple-black-wallpa.jpg)`
    ].join(', '),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
    height: 250
  },
  cardContent: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: '100%',
    position: 'relative'
  },
  chipLabel: {
    position: 'absolute',
    paddingLeft: 5,
    paddingRight: 5,
    top: 5,
    left: 5
  },
  gridContainer: {
    height: '100%'
  },
  gridItem: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
      fontSize: '1.2rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem'
    },
    marginBottom: theme.spacing(1.5)
  }
}))

const MarkdownCard = () => {
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea className={classes.cardActionArea} component={RouterLink} to="/author/create">
        <CardContent className={classes.cardContent}>
          <Chip label="Powered by TinyMCE" size="small" color="primary" className={classes.chipLabel} />
          <Grid className={classes.gridContainer} container>
            <Grid className={classes.gridItem} item xs={12}>
              <Typography className={classes.postTitle}>Markdown</Typography>
              <Typography className={classes.postSubtitle}>Create A Markdown Post</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MarkdownCard
