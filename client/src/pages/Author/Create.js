import * as Yup from 'yup'
import React, { useRef } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import {
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Chip,
  Avatar,
  InputAdornment,
  IconButton
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { Editor } from '@tinymce/tinymce-react'
import { categorySelector, TinyMCEApiKey, editorInit } from '../../constants'
import { createPost } from '../../actions'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4)
  },
  title: {
    fontFamily: 'Metal Mania',
    letterSpacing: 1
  },
  grid: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  form: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column'
  },
  inputField: {
    marginTop: theme.spacing(2)
  },
  tagsWrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  tagsShowcase: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(1)
  },
  tagChip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  editorWrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
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
  editorHelper: {
    paddingLeft: theme.spacing(2)
  },
  buttonField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
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

const CreatePost = () => {
  const tagRef = useRef(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      title: '',
      coverImage: '',
      category: '',
      description: '',
      content: '<p>Your content goes here</p>',
      premium: false,
      tags: []
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Field is required')
        .min(10, 'Title is too small')
        .matches(/[a-zA-Z0-9!_-]$/, 'Title contains invalid characters'),
      description: Yup.string().required('Field is required').min(50, 'Description is too small'),
      coverImage: Yup.string().required('Field is required').url('Provide a valid URL'),
      content: Yup.string().required('Field is required').min(200, 'Cannot be less than 200 letters'),
      category: Yup.string()
        .required('Field is required')
        .oneOf(categorySelector.map((category) => category.value))
    }),
    onSubmit: (values) => {
      dispatch(createPost(values))
    }
  })

  const { resetForm, handleSubmit, getFieldProps, values, errors, touched, setFieldValue, setFieldTouched } = formik

  const AddTagButton = () => (
    <InputAdornment position="end">
      <IconButton
        type="button"
        disabled={values.tags.length >= 5}
        onClick={() => {
          if (tagRef && tagRef.current) {
            if (values.tags.includes(tagRef.current.value) || tagRef.current.value.trim() === '') return
            setFieldValue('tags', [...values.tags, tagRef.current.value])
            tagRef.current.value = ''
          }
        }}
      >
        <Add />
      </IconButton>
    </InputAdornment>
  )

  return (
    <Container className={classes.container}>
      <Typography variant="h5" align="center" className={classes.title}>
        Create Post
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
          id="description"
          label="Description"
          name="description"
          placeholder="Enter Post Description"
          variant="outlined"
          margin="dense"
          error={!!touched.description && !!errors.description}
          helperText={(touched.description && errors.description) || 'Description should me minimum 50 letters'}
          {...getFieldProps('description')}
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
        <TextField
          fullWidth
          id="tags"
          label="Tags"
          name="tags"
          placeholder="Enter a relevant tag"
          variant="outlined"
          className={classes.inputField}
          margin="dense"
          helperText="Relevant tags has better reach to readers"
          inputRef={tagRef}
          InputProps={{ endAdornment: <AddTagButton /> }}
        />
        <div className={classes.tagsWrapper}>
          <div className={classes.tagsShowcase}>
            <div>
              {values.tags.length === 0 ? (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Enter tags to see here
                </Typography>
              ) : (
                values.tags.map((tag) => (
                  <Chip
                    key={tag}
                    avatar={<Avatar>{tag.charAt(0)}</Avatar>}
                    label={tag}
                    className={classes.tagChip}
                    onDelete={() => {
                      setFieldValue('tags', [...values.tags.filter((t) => t !== tag)])
                    }}
                  />
                ))
              )}
            </div>
          </div>
          <Typography variant="caption" color="textSecondary" className={classes.editorHelper}>
            You have {5 - values.tags.length} tags remaining
          </Typography>
        </div>
        <div className={classes.editorWrapper}>
          <div className={!!touched.content && !!errors.content ? classes.tinyEditorError : classes.tinyEditor}>
            <Editor
              initialValue={values.content}
              apiKey={TinyMCEApiKey}
              init={editorInit}
              onEditorChange={(content) => setFieldValue('content', content)}
              onBlur={() => setFieldTouched('content', true)}
            />
          </div>
          <Typography
            variant="caption"
            color={!!touched.content && !!errors.content ? 'error' : 'textSecondary'}
            className={classes.editorHelper}
          >
            {(touched.content && errors.content) || 'Content should be atleast 200 letters'}
          </Typography>
        </div>
        <FormControlLabel
          control={
            <Tooltip title="Premium post restricts the access to only registered members" aria-label="premium" arrow>
              <Checkbox
                checked={values.premium}
                name="premium"
                color="primary"
                onChange={(event) => setFieldValue('premium', event.target.checked)}
              />
            </Tooltip>
          }
          label="Mark as Premium?"
        />
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

export default CreatePost
