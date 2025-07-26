import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Provider } from 'react-redux'
import store from '../src/store/Store'

const WithAOS = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  }, [])

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <WithAOS />
  </React.StrictMode>,
)

reportWebVitals()
