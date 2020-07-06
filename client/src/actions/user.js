import axios from 'axios'
import { setTokens, axiosRequestInterceptor } from '../utils'
import { setLoginRequest, setRegistrationRequest, enqueueSnackbar } from './'
import { GET_USER, SET_USER, USER_ERROR, SET_SESSION } from '../constants'

export const loginUser = (values, setFieldError, handleClose, persistSession) => async (dispatch) => {
  try {
    dispatch(setLoginRequest(true))
    const res = await axios.post('/api/user/login', values)
    setTokens(res.data, persistSession)
    axiosRequestInterceptor(persistSession)
    dispatch(setSession(persistSession))
    dispatch(getUser())
    dispatch(enqueueSnackbar({ message: 'Login Success', options: { variant: 'success' } }))
    handleClose()
  } catch (err) {
    dispatch(handleErrors(err.response.data, setFieldError, 'Login'))
  } finally {
    dispatch(setLoginRequest(false))
  }
}

export const registerUser = (values, setFieldError, handleClose) => async (dispatch) => {
  try {
    dispatch(setRegistrationRequest(true))
    const res = await axios.post('/api/user/register', values)
    setTokens(res.data, false)
    axiosRequestInterceptor(false)
    dispatch(setSession(false))
    dispatch(getUser())
    dispatch(enqueueSnackbar({ message: 'Registration Success', options: { variant: 'success' } }))
    handleClose()
  } catch (err) {
    dispatch(handleErrors(err.response.data, setFieldError, 'Registration'))
  } finally {
    dispatch(setRegistrationRequest(true))
  }
}

export const handleErrors = (errorResponse, setFieldError, request) => (dispatch) => {
  if (errorResponse) {
    if (errorResponse.validation) {
      errorResponse.errors.forEach((error) => {
        setFieldError(error.param, error.msg)
      })
    } else if (errorResponse.authentication) {
      setFieldError(errorResponse.error.param, errorResponse.error.msg)
    } else {
      dispatch(enqueueSnackbar({ message: errorResponse.msg || `${request} Failed`, options: { variant: 'error' } }))
    }
  } else {
    dispatch(enqueueSnackbar({ message: `${request} Failed`, options: { variant: 'error' } }))
  }
}

export const setSession = (session) => (dispatch) => {
  dispatch({ type: SET_SESSION, payload: session })
}

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER })
  try {
    const res = await axios.get('/api/user')
    dispatch(setUser(res.data))
  } catch (err) {
    dispatch({ type: USER_ERROR })
  }
}

export const setUser = (data) => (dispatch) => {
  const isValidated = data.user.isValidated
  const isAdmin = data.user.isAdmin
  const isAuthor = data.user.isAuthor

  delete data.user.isAdmin
  delete data.user.isValidated
  delete data.user.isAuthor

  const payload = {
    isValidated,
    isAdmin,
    isAuthor,
    info: {
      ...data.user
    }
  }

  dispatch({ type: SET_USER, payload })
}

export const authorRequest = (data) => async (dispatch) => {
  try {
    await axios.post('/api/user/author-request', data)
    dispatch(enqueueSnackbar({ message: 'Your request has been registered', options: { variant: 'success' } }))
  } catch (error) {
    console.log(error.response.data)
    error.response.status === 409
      ? dispatch(enqueueSnackbar({ message: 'Previous request awaiting approval', options: { variant: 'warning' } }))
      : dispatch(enqueueSnackbar({ message: 'Author request failed', options: { variant: 'error' } }))
  }
}
