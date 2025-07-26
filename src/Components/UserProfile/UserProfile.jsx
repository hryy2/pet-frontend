import React, { useState, useEffect } from 'react'
import './UserProfile.css'
import { AiOutlineClose } from 'react-icons/ai'
import { FaAddressCard } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FiShoppingCart } from 'react-icons/fi'
import { FaRegHeart } from 'react-icons/fa'
import { FaBasketShopping } from 'react-icons/fa6'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { IoMenu } from 'react-icons/io5'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdOutlineLogout } from 'react-icons/md'
import MyAccount from '../MyAccount/MyAccount'
import ChangePassword from '../ChangePassword/ChangePassword'
import { useSelector, useDispatch } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { userDetail } from '../../services/Authentication/authAction'
import { logout } from '../../store/Store'
import ManageAddress from '../ManageAddress/ManageAddress'
import MyOrder from '../MyOrder/MyOrder'
import Cookies from 'js-cookie'

const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const tab = searchParams.get('tab') || 'My Account'

  const [showSideBar, setShowSideBar] = useState(false)
  const [showTab, setShowTab] = useState(tab)

  const user = useSelector((state) => state.auth)
  const { loading, userInformation } = user

  const subHead = [
    { head: 'My Account', icon: <MdOutlineAccountCircle /> },
    { head: 'My Orders', icon: <FaBasketShopping /> },
    { head: 'My Cart', icon: <FiShoppingCart />, path: '/cart' },
    { head: 'My Wishlist', icon: <FaRegHeart />, path: '/wishlist' },
    { head: 'Manage Addresses', icon: <FaAddressCard /> },
    { head: 'Change Password', icon: <RiLockPasswordFill /> },
    { head: 'Log Out', icon: <MdOutlineLogout /> },
  ]

  useEffect(() => {
    dispatch(userDetail())
  }, [])

  useEffect(() => {
    setShowTab(getTabFromUrl())
  }, [location.pathname])

  const getTabFromUrl = () => {
    const path = location.pathname
    if (path === '/my-account') return 'My Account'
    if (path === '/my-orders') return 'My Orders'
    return 'My Account'
  }

  const handleSideTabClick = async (item) => {
    if (item.path) {
      navigate(item.path)
    } else if (item.head === 'Log Out') {
      await Cookies.remove('LovepetUserToken')
      await dispatch(logout())
      navigate('/login')
    } else {
      navigate(`?tab=${item.head}`)
      setShowTab(item.head)
      setShowSideBar(false)
    }
  }

  return (
    <div className="w-full min-h-[75vh] bg-gradient-to-r from-blue-100 to-blue-200 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg relative z-10">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader color="#52ab98" loading={loading} size={35} />
            </div>
          ) : (
            <>
              <div className="md:hidden mb-4 flex justify-between items-center">
                <p className="text-xl font-semibold text-gray-800">Profile</p>
                <AiOutlineClose
                  className="text-xl cursor-pointer"
                  onClick={() => setShowSideBar(false)}
                />
              </div>

              <div className="text-center mb-6">
                <img
                  className="w-24 h-24 rounded-full mx-auto border-4 border-gray-200"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbI78v3a7Q5Tcm1DrdpZ7KEH2-ArooT9qzvFe6cLOYxy4wY-hp6dG-NrJKyv9_n5Hcjs&usqp=CAU"
                  alt="User Profile"
                />
                <p className="mt-2 font-semibold text-gray-900">
                  Hello, {userInformation?.firstName} {userInformation?.lastName}
                </p>
              </div>

              <div className="flex flex-col">
                {subHead.map((item) => (
                  <div
                    onClick={() => handleSideTabClick(item)}
                    key={item.head}
                    className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 hover:bg-gray-100 transition ${
                      tab === item.head ? 'bg-gray-200 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    <p className="text-base">{item.head}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-lg">
          <div
            onClick={() => setShowSideBar(!showSideBar)}
            className="md:hidden flex items-center cursor-pointer text-gray-800 mb-4"
          >
            <IoMenu size={24} />
            <p className="ml-2 text-xl">Account</p>
          </div>

          {tab === 'My Account' && <MyAccount />}
          {tab === 'Change Password' && <ChangePassword />}
          {tab === 'Manage Addresses' && <ManageAddress />}
          {tab === 'My Orders' && <MyOrder />}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
