const initialState = {
  loading: false,
  error: false,
  isSuccess: false,
  cartPriceUsingCoupan: null,
}

const coupanReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'APPLY_COUPAN_REQUEST':
      return { ...state, loading: true, error: null }
    case 'APPLY_COUPAN_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
        cartPriceUsingCoupan: action.payload.coupan,
      }
    case 'APPLY_COUPAN_FAILURE':
      return {
        ...state,
        error: true,
        loading: false,
      }

    case 'COUPAN_RESET_STATE':
      return {
        ...state,
        error: null,
        loading: false,
        isSuccess: false,
      }
    default:
      return state
  }
}

export default coupanReducer
