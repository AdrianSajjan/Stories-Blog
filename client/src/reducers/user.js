import { SET_SESSION, GET_USER, USER_ERROR, SET_USER } from '../constants'

const initialState = {
  isAuthenticated: false,
  persistSession: false,
  isValidated: false,
  isAdmin: false,
  isAuthor: false,
  info: null,
  loading: false
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_SESSION:
      return {
        ...state,
        persistSession: payload
      }

    case GET_USER: {
      return {
        ...state,
        loading: true
      }
    }
    case SET_USER: {
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    }
    case USER_ERROR: {
      return {
        ...state,
        loading: false
      }
    }

    default:
      return state
  }
}
