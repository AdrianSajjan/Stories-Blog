import axios from 'axios'
import { GET_USER, SET_USER, SET_SESSION } from '../constants'

export const setSession = (session) => (dispatch) => {
  dispatch({ type: SET_SESSION, payload: session })
}

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER })
  try {
    const res = await axios.get('/api/user')
    dispatch(setUser(res.data))
  } catch (err) {
    console.table(err.response.data || 'Error')
  }
}

export const setUser = (user) => (dispatch) => {
  dispatch({ type: SET_USER, payload: user })
}
