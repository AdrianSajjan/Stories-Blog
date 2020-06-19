import { getAccessToken, axiosRequestInterceptor } from './'
import { setSession, getUser } from '../actions'

export const verifyAuthentication = (store) => {
  if (getAccessToken(true)) {
    axiosRequestInterceptor(true)
    store.dispatch(setSession(true))
    store.dispatch(getUser())
  } else if (getAccessToken(false)) {
    axiosRequestInterceptor(false)
    store.dispatch(setSession(false))
    store.dispatch(getUser())
  }
}
