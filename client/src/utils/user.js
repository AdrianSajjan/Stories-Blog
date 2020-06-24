import { getAccessToken, getRefreshToken, axiosRequestInterceptor, axiosResponseInterceptor } from './'
import { setSession, getUser } from '../actions'

export const verifyAuthentication = (store) => {
  if (getAccessToken(true) || getRefreshToken(true)) {
    axiosRequestInterceptor(true)
    axiosResponseInterceptor(true)
    store.dispatch(setSession(true))
    store.dispatch(getUser())
  } else if (getAccessToken(false) || getRefreshToken(false)) {
    axiosRequestInterceptor(false)
    axiosResponseInterceptor(false)
    store.dispatch(setSession(false))
    store.dispatch(getUser())
  }
}
