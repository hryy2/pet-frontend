// import Cookies from 'js-cookie'
// export const Config = () => {
//   const token = Cookies.get('LovepetUserToken')
//   if (token) {
//     const decodedToken = JSON.parse(atob(token.split('.')[1]))
//     const expirationTime = new Date(decodedToken.exp * 1000)
//     const expireTimeInMs = expirationTime.getTime()
//     if (Date.now() > expireTimeInMs) {
//       // Cookies.remove('token')
//       Cookies.remove('LovepetUserToken')
//     }
//   } else {
//     console.error('Token not found in cookies')
//   }
//   const config = {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : '',
//     },
//   }

//   return config
// }
import Cookies from 'js-cookie';

export const Config = () => {
  let token = Cookies.get('LovepetUserToken');

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = new Date(decodedToken.exp * 1000);
      const expireTimeInMs = expirationTime.getTime();

      if (Date.now() > expireTimeInMs) {
        Cookies.remove('LovepetUserToken');
        token = null; // ⛔清除 token 变量，避免带上过期 token
      }
    } catch (err) {
      console.error('Failed to decode token:', err);
      Cookies.remove('LovepetUserToken');
      token = null;
    }
  }

  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };

  return config;
};
