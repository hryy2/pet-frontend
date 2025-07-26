import Cookies from 'js-cookie'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateLayout = ({ children }) => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = Cookies.get('LovepetUserToken')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])
  return (
    <>
      <Outlet />
    </>
  )
}
export default PrivateLayout
