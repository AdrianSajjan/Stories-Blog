import axios from 'axios'
import { GET_USER, SET_USER, USER_ERROR, SET_SESSION } from '../constants'

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
