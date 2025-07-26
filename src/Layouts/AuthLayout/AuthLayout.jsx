// src/components/AuthLayout.jsx
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 flex items-center justify-center">
      <Outlet />
    </div>
  )
}

export default AuthLayout
