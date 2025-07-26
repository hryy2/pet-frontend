const initialState = {
  loading: false,
  error: false,
  isSuccess: false,
  isVerified: false,
}

const verifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VERIFY_OTP_REQUEST':
      return { ...state, loading: true, error: null }
    case 'VERIFY_OTP_SUCCESS':
      return {
        ...state,
        loading: false,
        isVerified: action.payload.verify,
        error: null,
      }
    case 'VERIFY_OTP_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'VERIFY_OTP_FORGOT_REQUEST':
      return { ...state, loading: true, error: null }
    case 'VERIFY_OTP_FORGOT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
      }
    case 'VERIFY_OTP_FORGOT_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'FORGOT_PASSWORD_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      }
    case 'FORGOT_PASSWORD_FAILURE':
      return {
        ...state,
        error: true,
        loading: false,
      }
    case 'VERIFY_RESET_STATE':
      return {
        ...state,
        loading: false,
        error: false,
        isSuccess: false,
        isVerified: false,
      }
    default:
      return state
  }
}
export default verifyReducer
