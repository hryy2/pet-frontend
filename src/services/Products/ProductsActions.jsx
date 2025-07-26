import { baseUrl } from '../../utils/baseUrl'
import axios from 'axios'
import { Config } from '../../utils/AxiosConfig'
export const getProductRqst = () => ({
  type: 'GET_PRODUCT_REQUEST',
})
export const getProductSuccess = (product) => ({
  type: 'GET_PRODUCT_SUCCESS',
  payload: { product },
})
export const getProductFailure = (error) => ({
  type: 'GET_PRODUCT_FAILURE',
  payload: error,
})
export const getProductByIdRqst = () => ({
  type: 'GET_PRODUCT_BY_ID_REQUEST',
})
export const getProductByIdSuccess = (product) => ({
  type: 'GET_PRODUCT_BY_ID_SUCCESS',
  payload: { product },
})
export const getProductByIdFailure = (error) => ({
  type: 'GET_PRODUCT_BY_ID_FAILURE',
  payload: error,
})
export const addProductInWishlistRqst = () => ({
  type: 'ADD_PRODUCT_IN_WISHLIST_REQUEST',
})
export const addProductInWishlistSuccess = (product) => ({
  type: 'ADD_PRODUCT_IN_WISHLIST_SUCCESS',
})
export const addProductInWishlistFailure = (error) => ({
  type: 'ADD_PRODUCT_IN_WISHLIST_FAILURE',
  payload: error,
})
export const resetProductState = () => ({
  type: 'PRODUCT_RESET_STATE',
})




export const getProduct = (filter) => async (dispatch) => {
  // const filterParam = filter ? `?${filter}&limit=8` : '?sort=null?page=1&limit=8'
  const filterParam = filter ? `?${filter}&limit=8` : '?sort=null&page=1&limit=8'
  dispatch(getProductRqst())
  try {
    const response = await axios.get(`${baseUrl}/product${filterParam}`, Config())
    console.log(response)
    if (response) {
      await dispatch(getProductSuccess(response.data))
      setTimeout(() => {
        dispatch(resetProductState())
      }, 1000)
    }
  } catch (err) {
  
    dispatch(getProductFailure(err.response.data))
    return err.response.data
  }
}
export const getAllProduct = () => async (dispatch) => {
  dispatch(getProductRqst())
  try {
    const response = await axios.get(`${baseUrl}/product`, Config())

    if (response) {
      await dispatch(getProductSuccess(response.data))
      setTimeout(() => {
        dispatch(resetProductState())
      }, 1000)
    }
  } catch (err) {
    
    dispatch(getProductFailure(err.response.data))
    return err.response.data
  }
}

export const getProductsByKeyword = (keyword) => async (dispatch) => {
  // 如果没有传入关键字，直接返回
  if (!keyword) {
    return;
  }

  dispatch(getProductRqst()); // 开始请求，派发请求开始的 action

  try {
    // 这里的 API 路径需要根据你实际的后端接口来调整
    const response = await axios.get(`${baseUrl}/product/search?query=${keyword}`, Config());

    if (response) {
      await dispatch(getProductSuccess(response.data));  // 请求成功，保存数据
      setTimeout(() => {
        dispatch(resetProductState()); // 重置状态
      }, 1000);
    }
  } catch (err) {
    dispatch(getProductFailure(err.response?.data || "Something went wrong"));  // 请求失败，处理错误
    return err.response?.data;
  }
};




// export const getProductById = (slug) => async (dispatch) => {
//   dispatch(getProductByIdRqst())
//   try {
//     const response = await axios.get(`${baseUrl}/product/${slug}`, Config())
//     if (response) {
//       await dispatch(getProductByIdSuccess(response.data))
//       setTimeout(() => {
//         dispatch(resetProductState())
//       }, 1000)
//     }
//   } catch (err) {
//     dispatch(getProductByIdFailure(err.response.data))
//     return err.response.data
//   }
// }
export const getProductById = (id) => async (dispatch) => {
  // 检查 ID 是否有效
  if (!id || id === 'undefined') {
    console.error("Invalid product ID:", id); // 输出错误信息
    return dispatch(getProductByIdFailure("Invalid product IDDI")); // Dispatch 失败 action
  }

  dispatch(getProductByIdRqst());  // 发起请求

  try {
    const response = await axios.get(`${baseUrl}/product/id/${id}`, Config());  // 使用有效的 id 请求

    if (response) {
      await dispatch(getProductByIdSuccess(response.data)); // 请求成功，保存数据
      setTimeout(() => {
        dispatch(resetProductState()); // 重置状态
      }, 1000);
    }
  } catch (err) {
    dispatch(getProductByIdFailure(err.response?.data || "Something went wrong"));  // 请求失败，处理错误
    return err.response?.data;
  }
};



export const addProductInWishlist = (prodId) => async (dispatch) => {
  dispatch(addProductInWishlistRqst())
  try {
    const response = await axios.put(`${baseUrl}/product/wishlist/`, { prodId }, Config())
    if (response) {
      await dispatch(addProductInWishlistSuccess(response.data))
      setTimeout(() => {
        dispatch(resetProductState())
      }, 1000)
    }
  } catch (err) {
  
    dispatch(addProductInWishlistFailure(err.response.data))
    return err.response.data
  }
}
