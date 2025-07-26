import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Config } from '../../utils/AxiosConfig'
export const applyCoupanRqst = () => ({
  type: 'APPLY_COUPAN_REQUEST',
})
export const applyCoupanSuccess = (coupan) => ({
  type: 'APPLY_COUPAN_SUCCESS',
  payload: { coupan },
})
export const applyCoupanFailure = (error) => ({
  type: 'APPLY_COUPAN_FAILURE',
  payload: error,
})
export const applyCoupanResetState = () => ({
  type: 'COUPAN_RESET_STATE',
})

export const applyCoupan = (coupan) => async (dispatch) => {
  dispatch(applyCoupanRqst())
  try {
    const response = await axios.post(`${baseUrl}/user/cart/applyCoupan`, { coupan }, Config())
   
    if (response) {
      await dispatch(applyCoupanSuccess(response.data))
    }
  } catch (err) {
    
    dispatch(applyCoupanFailure(err.response.data))
    return err.response.data
  }
}
