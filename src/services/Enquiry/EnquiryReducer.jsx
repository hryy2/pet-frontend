const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
}

const enquiryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_ENQUIRY_REQUEST':
      return { ...state, loading: true, error: null }
    case 'POST_ENQUIRY_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
      }
    case 'POST_ENQUIRY_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case 'ENQUIRY_RESET_STATE':
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

export default enquiryReducer
