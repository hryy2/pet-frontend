const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Category: [],
  allCategory: [],
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_CATEGORY_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
        Category: action.payload.category,
      }
    case 'GET_CATEGORY_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'GET_ALL_CATEGORY_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_ALL_CATEGORY_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
        allCategory: action.payload.allCategory,
      }
    case 'GET_ALL_CATEGORY_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case 'CATEGORY_RESET_STATE':
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

export default categoryReducer
