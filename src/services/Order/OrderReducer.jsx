const initialState = {
  loading: false,
  error: null,
  isSuccess: false,
  Order: [],
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDER_REQUEST':
      return { ...state, loading: true, error: null }
    case 'GET_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
        Order: action.payload.order,
      }
    case 'GET_ORDER_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'CREATE_ORDER_REQUEST':
      return { ...state, loading: true, error: null }
    case 'CREATE_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        isSuccess: true,
        error: null,
      }
    case 'CREATE_ORDER_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case 'ORDER_RESET_STATE':
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

export default orderReducer
