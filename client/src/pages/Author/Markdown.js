import * as Yup from 'yup'
import React from 'react'
import { useFormik } from 'formik'
import { Container, Typography, Button, TextField, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Editor } from '@tinymce/tinymce-react'
import { categorySelector, TinyMCEApiKey, editorInit } from '../../constants'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3)
  },
  grid: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  form: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column'
  },
  inputField: {
    marginTop: theme.spacing(2)
  },
  editorWrapper: {
    marginTop: theme.spacing(2)
  },
  tinyEditor: {
    marginBottom: theme.spacing(0.5),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    borderRadius: 5
  },
  tinyEditorError: {
    marginBottom: theme.spacing(0.5),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.error.main,
    borderRadius: 5
  },
  helper: {
    paddingLeft: theme.spacing(2)
  },
  buttonField: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cancelBtn: {
    minWidth: 120,
    marginRight: theme.spacing(1)
  },
  submitBtn: {
    minWidth: 120,
    marginLeft: theme.spacing(1)
  }
}))

const Markdown = () => {
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      title: '',
      coverImage: '',
      category: '',
      content: '<p>Your content goes here</p>'
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Field is required').min(10, 'Title is too small'),
      coverImage: Yup.string().required('Field is required').url('Provide a valid URL'),
      content: Yup.string().required('Field is required').min(200, 'Cannot be less than 200 letters'),
      category: Yup.string()
        .required('Field is required')
        .oneOf(categorySelector.map((category) => category.value))
    }),
    onSubmit: (values, actions) => {
      console.table(values)
    }
  })

  const { resetForm, handleSubmit, getFieldProps, errors, touched, setFieldValue, setFieldTouched } = formik

  return (
    <Container className={classes.container}>
      <Typography variant="h6" align="center">
        Create Markdown Post
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit} onReset={resetForm}>
        <TextField
          fullWidth
          id="title"
          label="Title"
          name="title"
          placeholder="Enter Post Title"
          variant="outlined"
          margin="dense"
          error={!!touched.title && !!errors.title}
          helperText={(touched.title && errors.title) || 'Title should me minimum 10 letters'}
          {...getFieldProps('title')}
        />
        <TextField
          fullWidth
          id="cover-image-url"
          label="Cover Image URL"
          name="coverImage"
          placeholder="Enter Post Cover Image URL"
          variant="outlined"
          className={classes.inputField}
          margin="dense"
          error={!!touched.coverImage && !!errors.coverImage}
          helperText={(touched.coverImage && errors.coverImage) || 'Provide a valid URL'}
          {...getFieldProps('coverImage')}
        />
        <TextField
          select
          fullWidth
          id="catgory"
          name="category"
          label="Category"
          margin="dense"
          variant="outlined"
          className={classes.inputField}
          error={!!touched.category && !!errors.category}
          helperText={(touched.category && errors.category) || 'Select a category'}
          {...getFieldProps('category')}
        >
          {categorySelector.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
        <div className={classes.editorWrapper}>
          <div className={!!touched.content && !!errors.content ? classes.tinyEditorError : classes.tinyEditor}>
            <Editor
              initialValue="<p>Your content goes here</p>"
              apiKey={TinyMCEApiKey}
              init={editorInit}
              onEditorChange={(content) => setFieldValue('content', content)}
              onBlur={() => setFieldTouched('content', true)}
            />
          </div>
          <Typography
            variant="caption"
            color={!!touched.content && !!errors.content ? 'error' : 'textSecondary'}
            className={classes.helper}
          >
            {(touched.content && errors.content) || 'Content should be atleast 200 letters'}
          </Typography>
        </div>
        <div className={classes.buttonField}>
          <Button type="reset" variant="contained" color="secondary" className={classes.cancelBtn} disableElevation>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" className={classes.submitBtn} disableElevation>
            Create Post
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default Markdown
