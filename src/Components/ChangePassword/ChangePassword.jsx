import './ChangePassword.css'
import Button from '../Button/Button'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { updatePassword } from '../../services/Authentication/authAction'
import ClipLoader from 'react-spinners/ClipLoader'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const { loading, isLoginSuccess, userInformation, error } = user
  const [passwords, setPasswords] = useState({ newPassword: '', currentPassword: '' })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrPswrd, setShowCurrPswrd] = useState(true)
  const [showNewPswrd, setShowNewPswrd] = useState(true)
  const [showCnfNewPswrd, setShowCnfNewPNew] = useState(true)

  const handleChange = (e, fieldName) => {
    setPasswords((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }))
  }

  const update = async () => {
    navigate('?tab=Change%20Password')
    if (passwords.newPassword !== confirmPassword) {
      toast.error('New Password does not match')
    } else if (passwords.newPassword.length < 8) {
      toast.error('Password must have at least 8 characters')
    } else {
      await dispatch(updatePassword(passwords))
    }
  }

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success('Password updated successfully')
    } else if (error) {
      toast.error('Check Current Password')
    }
  }, [isLoginSuccess, error])

  return (
    <div className='change-password-wrapper'>
      <div className='change-password-card'>
        {loading && (
          <div className='loader'>
            <ClipLoader color='#52ab98' loading={loading} size={25} />
          </div>
        )}
        <h2 className='title'>Change Password</h2>

        {/* Current Password */}
        <div className='form-group'>
          <label className='form-label'>Current Password</label>
          <div className='form-input-wrapper'>
            <input
              type={showCurrPswrd ? 'password' : 'text'}
              placeholder='Enter current password'
              value={passwords.currentPassword}
              onChange={(e) => handleChange(e, 'currentPassword')}
              className='form-input'
            />
            <span onClick={() => setShowCurrPswrd(!showCurrPswrd)} className='toggle-visibility'>
              {showCurrPswrd ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* New Password */}
        <div className='form-group'>
          <label className='form-label'>New Password</label>
          <div className='form-input-wrapper'>
            <input
              type={showNewPswrd ? 'password' : 'text'}
              placeholder='Enter new password'
              value={passwords.newPassword}
              onChange={(e) => handleChange(e, 'newPassword')}
              className='form-input'
            />
            <span onClick={() => setShowNewPswrd(!showNewPswrd)} className='toggle-visibility'>
              {showNewPswrd ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className='form-group'>
          <label className='form-label'>Confirm New Password</label>
          <div className='form-input-wrapper'>
            <input
              type={showCnfNewPswrd ? 'password' : 'text'}
              placeholder='Re-enter new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='form-input'
            />
            <span onClick={() => setShowCnfNewPNew(!showCnfNewPswrd)} className='toggle-visibility'>
              {showCnfNewPswrd ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className='update-button-wrapper' onClick={update}>
          <Button title='Update Password' />
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
