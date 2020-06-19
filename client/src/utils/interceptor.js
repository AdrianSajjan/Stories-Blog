import axios from 'axios'
import { getAccessToken } from './'

export const axiosRequestInterceptor = (persistSession) => {
  axios.interceptors.request.use(
    (config) => {
      const token = getAccessToken(persistSession)
      if (token) config.headers['accessToken'] = token
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )
}

/*
export const useResponseInterceptor = (persistSession) => {
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config

      if (error.response.status !== 401 || originalRequest._retry) return Promise.reject(error)

      if (originalRequest.url === '/api/auth/oauth2') {
        store.dispatch(logout())
        return Promise.reject(error)
      }

      originalRequest._retry = true
      const refreshToken = getRefreshToken(persistSession)
      const res = await axios.post('/api/oauth2', { refreshToken })
      store.dispatch(updateTokens(res.data))

      return axios(originalRequest)
    }
  )
}
*/
