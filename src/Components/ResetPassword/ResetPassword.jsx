import './ResetPassword.css'
import Button from '../Button/Button'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { updatePassword } from '../../services/Authentication/authAction'
import ClipLoader from 'react-spinners/ClipLoader'
import { useNavigate } from 'react-router-dom'
const ResetPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showNewPswrd, setShowNewPswrd] = useState(true);

    return (
        <>
            <div className='changePassword w-[screen]   min-h-[73vh]   '>
                <div className='chngPswwrdCard '>
                    {/* {loading && (
                        <div className='loader'>
                            <ClipLoader
                                color={'#52ab98'}
                                loading={loading}
                                size={25}
                                aria-label='Loading Spinner'
                                data-testid='loader'
                            />
                        </div>
                    )} */}
                    <div className='cpHead'>
                        {' '}
                        <p>Change Password</p>
                    </div>
                    <div className='inputContainer'>
                        <p className='label'>New Password</p>
                        <div className='inputCp'>
                            <input
                                // onChange={(e) => handleChange(e, 'newPassword')}
                                // value={passwords.newPassword}
                                className='outline-none'
                                type={showNewPswrd ? 'password' : 'text'}
                                placeholder='Current Password'
                                id=''
                            />
                            <span onClick={() => setShowNewPswrd(!showNewPswrd)} className='eye'>
                                {showNewPswrd ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    {/* <div onClick={update}>
                        <Button title={'Update Password'} />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ResetPassword
