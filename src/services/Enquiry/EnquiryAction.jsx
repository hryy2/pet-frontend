import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Config } from '../../utils/AxiosConfig'
export const postEnqRqst = () => ({
  type: 'POST_ENQUIRY_REQUEST',
})
export const postEnqSuccess = () => ({
  type: 'POST_ENQUIRY_SUCCESS',
})
export const postEnqFailure = (error) => ({
  type: 'POST_ENQUIRY_FAILURE',
  payload: error,
})
export const resetEnqState = () => ({
  type: 'ENQUIRY_RESET_STATE',
})

export const postEnq = (enquiry) => async (dispatch) => {
  dispatch(postEnqRqst())
  
  try {
    const response = await axios.post(`${baseUrl}/enquiry/`, enquiry, Config())
    if (response) {
      await dispatch(postEnqSuccess(response.data))
      setTimeout(() => {
        dispatch(resetEnqState())
      }, 1000)
    }
  } catch (err) {
   
    dispatch(postEnqFailure(err.response.data))
    return err.response.data
  }
}
