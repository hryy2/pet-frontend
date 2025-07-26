import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Config } from '../../utils/AxiosConfig'
export const verifyOtpRqst = () => ({
  type: 'VERIFY_OTP_REQUEST',
})

export const verifyOtpSuccess = (verify) => ({
  type: 'VERIFY_OTP_SUCCESS',
  payload: { verify },
})

export const verifyOtpFailure = () => ({
  type: 'VERIFY_OTP_FAILURE',
})
export const verifyOtpFrogotPasswordRqst = () => ({
  type: 'VERIFY_OTP_FORGOT_REQUEST',
})

export const verifyOtpFrogotPasswordSuccess = (verify) => ({
  type: 'VERIFY_OTP_FORGOT_SUCCESS',
  payload: { verify },
})

export const verifyOtpFrogotPasswordFailure = () => ({
  type: 'VERIFY_OTP_FORGOT_FAILURE',
})
export const forgotPasswordRqst = () => ({
  type: 'FORGOT_PASSWORD_REQUEST',
})

export const forgotPasswordSuccess = () => ({
  type: 'FORGOT_PASSWORD_SUCCESS',
})

export const forgotPasswordFailure = () => ({
  type: 'FORGOT_PASSWORD_FAILURE',
})
export const resetVerifcationState=()=>({
  type:'VERIFY_RESET_STATE'
})
export const verifyOtp = (otp, email) => async (dispatch) => {
  const data = { email: email, otp: otp }
  dispatch(verifyOtpRqst())
  try {
    const response = await axios.post(`${baseUrl}/user/verify-account`, data)

    if (response) {
      await dispatch(verifyOtpSuccess(response.data.message))
    }
  } catch (err) {
    
    dispatch(verifyOtpFailure(err.response))
    return err.response
  }
}
export const verifyOtpForgotPassword = (otp, email) => async (dispatch) => {
  const data = { email: email, enteredOTP: otp }
 
  dispatch(verifyOtpFrogotPasswordRqst())
  try {
    const response = await axios.post(`${baseUrl}/user/verify-otp`, data)
 
    if (response) {
      await dispatch(verifyOtpFrogotPasswordSuccess(response.data.message))
    }
  } catch (err) {
   
    dispatch(verifyOtpFrogotPasswordFailure(err.response))
    return err.response
  }
}
export const sendOtpForgotPassword = ( email) => async (dispatch) => {
 
  const data = { email: email }
  dispatch(forgotPasswordRqst())
  try {
    const response = await axios.post(`${baseUrl}/user/forgot-password-token`, data)
    if (response) {
     
      await dispatch(forgotPasswordSuccess(response.data.message))
      setTimeout(() => {
        dispatch(resetVerifcationState())
      }, 1000)
    }
  } catch (err) {
    dispatch(forgotPasswordFailure(err.response))
    setTimeout(() => {
      dispatch(resetVerifcationState())
    }, 1000)
    return err.response
  }
}
