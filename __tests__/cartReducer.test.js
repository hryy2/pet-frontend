import cartReducer from '../src/services/Cart/CartReducer'

describe('Cart Reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      loading: false,
      error: null,
      isSuccess: false,
      Cart: [],
    }

    expect(cartReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_CART_SUCCESS', () => {
    const mockCart = [{ id: 1, name: 'Dog Toy' }]
    const action = {
      type: 'GET_CART_SUCCESS',
      payload: {
        cart: mockCart,
      },
    }

    const expectedState = {
      loading: false,
      error: null,
      isSuccess: true,
      Cart: mockCart,
    }

    expect(cartReducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle GET_CART_FAILURE', () => {
    const action = {
      type: 'GET_CART_FAILURE',
      payload: 'Something went wrong',
    }

    const expectedState = {
      loading: false,
      error: 'Something went wrong',
      isSuccess: false,
      Cart: [],
    }

    expect(cartReducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle RESET_CART_STATE', () => {
    const currentState = {
      loading: true,
      error: 'Error',
      isSuccess: true,
      Cart: [{ id: 1 }],
    }

    const expectedState = {
      loading: false,
      error: null,
      isSuccess: false,
      Cart: [{ id: 1 }], // 注意 Cart 保持不变
    }

    expect(cartReducer(currentState, { type: 'RESET_CART_STATE' })).toEqual(expectedState)
  })
})
