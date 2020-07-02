import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { Table, TableContainer, TableCell, TableBody, TableHead, TableRow, TablePagination } from '@material-ui/core'
import { CheckCircle, DeleteForever } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2)
  },
  tablePagination: {
    marginLeft: 'auto'
  },
  tableCellHead: {
    fontWeight: 600
  },
  tableCellBody: {
    fontWeight: 500
  },
  checkIcon: {
    color: '#00bb00'
  }
}))

const PendingRequest = () => {
  const styles = useStyles()

  return (
    <Fragment>
      <Typography variant="h5" align="center" className={styles.pageTitle}>
        Pending Requests List
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className={styles.tableCellHead}>ID</TableCell>
                    <TableCell className={styles.tableCellHead}>Name</TableCell>
                    <TableCell className={styles.tableCellHead}>Email</TableCell>
                    <TableCell className={styles.tableCellHead}>Username</TableCell>
                    <TableCell align="center" className={styles.tableCellHead}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <TableRow key={index}>
                      <TableCell className={styles.tableCellBody}>{index}</TableCell>
                      <TableCell className={styles.tableCellBody}>Adrian Sajjan</TableCell>
                      <TableCell className={styles.tableCellBody}>adriansajjan2001@gmail.com</TableCell>
                      <TableCell className={styles.tableCellBody}>adriansajjan</TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <CheckCircle className={styles.checkIcon} />
                        </IconButton>
                        <IconButton color="secondary">
                          <DeleteForever />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              rowsPerPageOptions={[]}
              count={20}
              rowsPerPage={5}
              page={0}
              onChangePage={() => {}}
              className={styles.tablePagination}
            />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default PendingRequest
