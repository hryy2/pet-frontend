// __tests__/SearchInput.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../src/Layouts/Header/Header'
import { BrowserRouter } from 'react-router-dom'
import React from 'react';


test('user can type in search box', () => {
  render(<BrowserRouter><Header /></BrowserRouter>)
  const input = screen.getByPlaceholderText(/search here/i)
  fireEvent.change(input, { target: { value: 'cat' } })
  expect(input.value).toBe('cat')
})
