import { SET_SESSION, GET_USER, SET_USER } from '../constants'

const initialState = {
  isAuthenticated: false,
  persistSession: false,
  user: null,
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

    default:
      return state
  }
}
