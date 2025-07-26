const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
}

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_RATING_REQUEST':
      return { ...state, loading: true, error: null }
    case 'POST_RATING_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
      }
    case 'POST_RATING_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case 'RATING_RESET_STATE':
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

export default ratingReducer
