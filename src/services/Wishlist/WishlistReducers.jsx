const initialState = {
  loading: false,
  error: false,
  isSuccess: false,
  Wishlist: [],
}

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_WISHLIST_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_WISHLIST_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
        Wishlist: action.payload.wishlist,
      }
    case 'GET_WISHLIST_FAILURE':
      return {
        ...state,
        error: true,
        loading: false,
      }

    case 'WISHLIST_RESET_STATE':
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

export default wishlistReducer
