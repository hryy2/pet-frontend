import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Config } from '../../utils/AxiosConfig'
export const getOrderRqst = () => ({
  type: 'GET_ORDER_REQUEST',
})
export const getOrderSuccess = (order) => ({
  type: 'GET_ORDER_SUCCESS',
  payload: { order },
})
export const getOrderFailure = (error) => ({
  type: 'GET_ORDER_FAILURE',
  payload: error,
})
export const createOrderRqst = () => ({
  type: 'CREATE_ORDER_REQUEST',
})
export const createOrderSuccess = () => ({
  type: 'CREATE_ORDER_SUCCESS',
})
export const createOrderFailure = (error) => ({
  type: 'CREATE_ORDER_FAILURE',
  payload: error,
})
export const resetOrderState = () => ({
  type: 'ORDER_RESET_STATE',
})

export const getOrder = () => async (dispatch) => {
  dispatch(getOrderRqst())
  try {
    const response = await axios.get(`${baseUrl}/user/get-order`, Config())
    if (response) {
      await dispatch(getOrderSuccess(response.data))
      setTimeout(() => {
        dispatch(resetOrderState())
      }, 1000)
    }
  } catch (err) {
   
    dispatch(getOrderFailure(err.response.data))
    return err.response.data
  }
}

export const createOrder = (data) => async (dispatch) => {
  dispatch(createOrderRqst())
  try {
    const response = await axios.post(`${baseUrl}/user/cart/create-order`, data, Config())
    if (response) {
      await dispatch(createOrderSuccess(response.data))
      setTimeout(() => {
        dispatch(resetOrderState())
      }, 1000)
    }
  } catch (err) {
   
    dispatch(createOrderFailure(err.response.data))
    return err.response.data
  }
}
