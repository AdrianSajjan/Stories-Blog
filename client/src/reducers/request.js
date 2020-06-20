import { LOGIN_REQUEST, REGISTER_REQUEST } from '../constants'

const initialState = {
  login: false,
  register: false,
  user: false
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        login: payload
      }
    case REGISTER_REQUEST:
      return {
        ...state,
        register: payload
      }
    default:
      return state
  }
}
