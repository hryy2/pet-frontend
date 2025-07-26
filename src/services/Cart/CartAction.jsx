import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Config } from '../../utils/AxiosConfig'
export const getCartRqst = () => ({
  type: 'GET_CART_REQUEST',
})
export const getCartSuccess = (cart) => ({
  type: 'GET_CART_SUCCESS',
  payload: { cart },
})
export const getCartFailure = (error) => ({
  type: 'GET_CART_FAILURE',
  payload: error,
})
export const addToCartRqst = () => ({
  type: 'ADD_TO_CART_REQUEST',
})
export const addToCartSuccess = (cart) => ({
  type: 'ADD_TO_CART_SUCCESS',
})
export const addToCartFailure = (error) => ({
  type: 'ADD_TO_CART_FAILURE',
  payload: error,
})
export const deleteProductCartRqst = () => ({
  type: 'DELETE_FROM_CART_REQUEST',
})
export const deleteProductCartSuccess = () => ({
  type: 'DELETE_FROM_CART_SUCCESS',
})
export const deleteProductCartFailure = () => ({
  type: 'DELETE_FROM_CART_FAILURE',
})
export const resetCartState = () => ({
  type: 'RESET_CART_STATE',
})

export const getCart = () => async (dispatch) => {
  dispatch(getCartRqst())
  try {
    const response = await axios.get(`${baseUrl}/user/cart`, Config())
    if (response) {
      await dispatch(getCartSuccess(response.data))
      setTimeout(() => {
        dispatch(resetCartState())
      }, 1000)
    }
  } catch (err) {
    dispatch(getCartFailure(err.response.data))
    return err.response.data
  }
}

export const addToCartProduct = (data) => async (dispatch) => {
  dispatch(addToCartRqst())
  try {
    const response = await axios.post(`${baseUrl}/user/add-to-cart/`, data, Config())
    if (response) {
      await dispatch(addToCartSuccess(response.data))
      setTimeout(() => {
        dispatch(resetCartState())
      }, 1000)
    }
  } catch (err) {
    dispatch(addToCartFailure(err.response.data))
    return err.response.data
  }
}
export const deleteProductFromCart = (id) => async (dispatch) => {
  dispatch(deleteProductCartRqst())
  try {
    const response = await axios.delete(`${baseUrl}/user/remove-from-cart/${id}`, Config())
    if (response) {
      await dispatch(deleteProductCartSuccess(response.data))
      setTimeout(() => {
        dispatch(resetCartState())
      }, 1000)
    }
  } catch (err) {
    dispatch(deleteProductCartFailure(err.response.data))
    return err.response.data
  }
}
