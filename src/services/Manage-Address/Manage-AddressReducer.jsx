const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
}

const manageAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADDRESS_ADD_REQUEST':
      return { ...state, loading: true, error: null }
    case 'ADDRESS_ADD_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
      }
    case 'ADDRESS_ADD_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'ADDRESS_DELETE_REQUEST':
      return { ...state, loading: true, error: null }
    case 'ADDRESS_DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
      }
    case 'ADDRESS_DELETE_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case 'ADDRESS_RESET_STATE':
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

export default manageAddressReducer
