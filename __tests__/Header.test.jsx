// tests/Header.test.jsx
import { render, screen } from '@testing-library/react'
import Header from '../src/Layouts/Header/Header.jsx' // 看错误栈可能你项目是放在 Layouts
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../src/store/Store'
import React from 'react';
import '@testing-library/jest-dom';



describe('Header component', () => {
  it('should render logo and search input', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByText(/Lovepet/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Search here/i)).toBeInTheDocument()
  })
})
