const accessToken = 'access-token'
const refreshToken = 'refresh-token'

export const getAccessToken = (persistSession) => {
  return persistSession ? localStorage.getItem(accessToken) : sessionStorage.getItem(accessToken)
}

export const getRefreshToken = (persistSession) => {
  return persistSession ? localStorage.getItem(refreshToken) : sessionStorage.getItem(refreshToken)
}

export const setTokens = (tokens, persistSession) => {
  if (persistSession) {
    sessionStorage.clear()
    localStorage.setItem(accessToken, tokens.accessToken)
    localStorage.setItem(refreshToken, tokens.refreshToken)
  } else {
    localStorage.clear()
    sessionStorage.setItem(accessToken, tokens.accessToken)
    sessionStorage.setItem(refreshToken, tokens.refreshToken)
  }
}
