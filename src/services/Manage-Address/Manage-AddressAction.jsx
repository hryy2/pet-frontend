import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Config } from '../../utils/AxiosConfig'
export const addAddressRqst = () => ({
  type: 'ADDRESS_ADD_REQUEST',
})
export const addAddressSuccess = () => ({
  type: 'ADDRESS_ADD_SUCCESS',
})
export const addAddressFailure = (error) => ({
  type: 'ADDRESS_ADD_FAILURE',
  payload: error,
})
export const deleteAddressRqst = () => ({
  type: 'ADDRESS_DELETE_REQUEST',
})
export const deleteAddressSuccess = () => ({
  type: 'ADDRESS_DELETE_SUCCESS',
})
export const deleteAddressFailure = (error) => ({
  type: 'ADDRESS_DELETE_FAILURE',
  payload: error,
})

export const resetAddressState = () => ({
  type: 'ADDRESS_RESET_STATE',
})

export const addAddress = (data) => async (dispatch) => {
  dispatch(addAddressRqst())
  try {
    const response = await axios.post(`${baseUrl}/user/save-address`, data, Config())
    if (response) {
      await dispatch(addAddressSuccess(response))
      setTimeout(() => {
        dispatch(resetAddressState())
      }, 1000)
    }
  } catch (err) {
    dispatch(addAddressFailure(err))
    return err
  }
}

export const deleteAddress = (id) => async (dispatch) => {
  dispatch(deleteAddressRqst())
  try {
    const response = await axios.delete(`${baseUrl}/user/delete-address/${id}`, Config())
    if (response) {
      await dispatch(deleteAddressSuccess(response))
      setTimeout(() => {
        dispatch(resetAddressState())
      }, 1000)
    }
  } catch (err) {
    dispatch(deleteAddressFailure(err))
    return err
  }
}
