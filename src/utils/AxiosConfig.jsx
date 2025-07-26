import Cookies from 'js-cookie'
export const Config = () => {
  const token = Cookies.get('LovepetUserToken')
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = new Date(decodedToken.exp * 1000)
    const expireTimeInMs = expirationTime.getTime()
    if (Date.now() > expireTimeInMs) {
      // Cookies.remove('token')
      Cookies.remove('LovepetUserToken')
    }
  } else {
    console.error('Token not found in cookies')
  }
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }

  return config
}
