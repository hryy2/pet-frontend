const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Cart: [],
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CART_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_CART_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
        Cart: action.payload.cart,
      }
    case 'GET_CART_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'ADD_TO_CART_REQUEST':
      return { ...state, loading: true, error: null }
    case 'ADD_TO_CART_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
      }
    case 'ADD_TO_CART_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'DELETE_FROM_CART_REQUEST':
      return { ...state, loading: true, error: null }
    case 'DELETE_FROM_CART_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
      }
    case 'DELETE_FROM_CART_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_CART_STATE':
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

export default cartReducer
