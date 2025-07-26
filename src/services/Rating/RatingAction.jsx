import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Config } from '../../utils/AxiosConfig'
export const postRatingRqst = () => ({
  type: 'POST_RATING_REQUEST',
})
export const postRatingSuccess = () => ({
  type: 'POST_RATING_SUCCESS',
})
export const postRatingFailure = (error) => ({
  type: 'POST_RATING_FAILURE',
  payload: error,
})
export const resetRatingState = () => ({
  type: 'RATING_RESET_STATE',
})

export const postRating = (data) => async (dispatch) => {
 
  dispatch(postRatingRqst())
  try {
    const response = await axios.put(`${baseUrl}/product/rating`, data, Config())
   
    if (response) {
      await dispatch(postRatingSuccess(response.data))
      setTimeout(() => {
        dispatch(resetRatingState())
      }, 1000)
    }
  } catch (err) {
   
    dispatch(postRatingFailure(err.response.data))
    return err.response.data
  }
}
