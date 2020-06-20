import { LOGIN_REQUEST, REGISTER_REQUEST } from '../constants'

export const setLoginRequest = (request) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST, payload: request })
}

export const setRegistrationRequest = (request) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST, payload: request })
}
