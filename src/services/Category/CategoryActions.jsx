import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Config } from '../../utils/AxiosConfig'
export const getCategoryRqst = () => ({
  type: 'GET_CATEGORY_REQUEST',
})
export const getCategorySuccess = (category) => ({
  type: 'GET_CATEGORY_SUCCESS',
  payload: { category },
})
export const getCategoryFailure = (error) => ({
  type: 'GET_CATEGORY_FAILURE',
  payload: error,
})
export const getAllCategoryRqst = () => ({
  type: 'GET_ALL_CATEGORY_REQUEST',
})
export const getAllCategorySuccess = (allCategory) => ({
  type: 'GET_ALL_CATEGORY_SUCCESS',
  payload: { allCategory },
})
export const getAllCategoryFailure = (error) => ({
  type: 'GET_ALL_CATEGORY_FAILURE',
  payload: error,
})
export const resetCategoryState = () => ({
  type: 'CATEGORY_RESET_STATE',
})

export const getCategory = (filter) => async (dispatch) => {
  if (!filter) {
    dispatch(getCategorySuccess([]))
  } else {
    dispatch(getCategoryRqst())
    try {
      const response = await axios.get(`${baseUrl}/categories?category=${filter}`)
      if (response) {
        await dispatch(getCategorySuccess(response.data))
        setTimeout(() => {
          dispatch(resetCategoryState())
        }, 1000)
      }
    } catch (err) {
      dispatch(getCategoryFailure(err.response.data))
      return err.response.data
    }
  }
}
export const getAllCategory = () => async (dispatch) => {
  dispatch(getAllCategoryRqst())
  try {
    const response = await axios.get(`${baseUrl}/categories/`)
    if (response) {
      await dispatch(getAllCategorySuccess(response.data))
      setTimeout(() => {
        dispatch(resetCategoryState())
      }, 1000)
    }
  } catch (err) {
    dispatch(getAllCategoryFailure(err.response.data))
    return err.response.data
  }
}
