import './Login.css'
import { IoLockClosedOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import Button from '../Button/Button'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { userLogin } from '../../services/Authentication/authAction.jsx'
import ClipLoader from 'react-spinners/ClipLoader'
import { getAllCategory } from '../../services/Category/CategoryActions.jsx'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [secure, setSecure] = useState(true)
  const [credential, setCredential] = useState({ email: '', password: '' })

  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  const handleChange = (e, fieldName) => {
    setCredential((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }))
  }

  const login = async () => {
    if (!credential.email || !credential.password) {
      toast.error('Please fill in all fields')
      return
    }
    await dispatch(userLogin(credential))
  }

  const forgotPassword = () => {
    if (!credential.email) {
      toast.error('*Email field is required')
    } else {
      toast.info('Forgot password feature not implemented yet')
    }
  }

  const authState = useSelector((state) => state)
  const { user, error, isLoginSuccess, loading } = authState.auth

  useEffect(() => {
    if (isLoginSuccess) {
      navigate('/')
      toast.success('Login Successful')
    }
  }, [isLoginSuccess])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 loginCard">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Sign In to Your Account</h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">*Invalid email or password</p>}

        {loading && (
          <div className="flex justify-center mb-4">
            <ClipLoader color={'#52ab98'} loading={loading} size={25} />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700">
            <CgProfile className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Enter your email"
              className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700 dark:text-white placeholder-gray-400"
              value={credential.email}
              onChange={(e) => handleChange(e, 'email')}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700">
            <IoLockClosedOutline className="text-gray-400 mr-2" />
            <input
              type={secure ? 'password' : 'text'}
              placeholder="Enter your password"
              className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700 dark:text-white placeholder-gray-400"
              value={credential.password}
              onChange={(e) => handleChange(e, 'password')}
            />
            <span onClick={() => setSecure(!secure)} className="cursor-pointer text-gray-500">
              {secure ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="mb-6 text-right">
          <button onClick={forgotPassword} className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </button>
        </div>

        <div className="mb-4">
          <div onClick={login}>
            <Button title="Sign in" widthButton="100%" />
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signUp')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
