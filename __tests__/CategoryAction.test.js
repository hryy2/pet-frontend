// import thunk from 'redux-thunk';
// import axios from 'axios';  // 引入 axios
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { getCategory, getCategorySuccess, getCategoryFailure, getAllCategory, getAllCategorySuccess, getAllCategoryFailure } from '../src/services/Category/CategoryActions';

describe('Category Actions', () => {
  it('dispatches GET_CATEGORY_SUCCESS when getCategory succeeds', () => {
    // 模拟返回的 category 数据
    const mockCategory = { id: 1, name: 'Category1' };

    const expectedAction = {
      type: 'GET_CATEGORY_SUCCESS',  // 修改为正确的 action 类型
      payload: { category: mockCategory },  // 包装 category 数据
    };

    // 假设 getCategorySuccess 是同步的
    const action = getCategorySuccess(mockCategory);
    expect(action).toEqual(expectedAction);
  });

  it('dispatches GET_CATEGORY_FAILURE when getCategory fails', () => {
    // 模拟失败的 error
    const error = new Error('Failed to fetch');

    const expectedAction = {
      type: 'GET_CATEGORY_FAILURE',  // 修改为正确的 action 类型
      payload: error,  // payload 为 error 对象
    };

    // 假设 getCategoryFailure 是同步的
    const action = getCategoryFailure(error);
    expect(action).toEqual(expectedAction);
  });

  it('dispatches GET_ALL_CATEGORY_SUCCESS when getAllCategory succeeds', () => {
    // 模拟返回的所有 category 数据
    const mockCategories = [
      { id: 1, name: 'Category1' },
      { id: 2, name: 'Category2' },
    ];

    const expectedAction = {
      type: 'GET_ALL_CATEGORY_SUCCESS',  // 修改为正确的 action 类型
      payload: { allCategory: mockCategories },  // 包装 allCategory 数据
    };

    // 假设 getAllCategorySuccess 是同步的
    const action = getAllCategorySuccess(mockCategories);
    expect(action).toEqual(expectedAction);
  });

  it('dispatches GET_ALL_CATEGORY_FAILURE when getAllCategory fails', () => {
    // 模拟失败的 error
    const error = new Error('Failed to fetch all categories');

    const expectedAction = {
      type: 'GET_ALL_CATEGORY_FAILURE',  // 修改为正确的 action 类型
      payload: error,  // payload 为 error 对象
    };

    // 假设 getAllCategoryFailure 是同步的
    const action = getAllCategoryFailure(error);
    expect(action).toEqual(expectedAction);
  });
});
