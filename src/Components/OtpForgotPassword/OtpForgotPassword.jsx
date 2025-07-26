import './OtpForgotPassword.css'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { toast } from 'react-toastify'
import { useRef, useState } from 'react'
import { resetVerifcationState, verifyOtp, verifyOtpForgotPassword } from '../../services/Verification/VerifyAction'
import { useEffect } from 'react'
import ResetPassword from '../ResetPassword/ResetPassword'
const OtpForgotPassword= ({ email }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('')
    const [otpVerification, setOtpVerification] = useState(false)
    const [showScreen, setShowScreen]=useState("otp")
    const verifyOTP = async () => {
        await dispatch(resetVerifcationState())
        await dispatch(verifyOtpForgotPassword(otp, email))
        setOtpVerification(true)
    }
    const verifyState = useSelector((state) => state.verify.error)
    useEffect(() => {
      if (verifyState && otpVerification) {
            toast.error("Incorrect OTP")
        }
        else{
            setShowScreen("resetPassword")
        }
    }, [verifyState, otpVerification])
    return (
        <>
            <div className='otpPage w-[screen]  min-h-[74vh]   '>
                {showScreen === "otp" && (<div className='otpCard '>
                    <div className='otpHead'>
                        {' '}
                        <p>Verify with otp</p>
                    </div>
                    <p className='sentto'>sent to {email}</p>
                    <div className='otp'>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span></span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{
                                textAlign: 'center',
                                height: '40px',
                                textAlign: 'center',
                                border: '1px solid var(--primary)',
                                backgroundColor: 'white',
                                margin: '0px 15px',
                                fontSize: '18px',
                                width: '40px',
                            }}
                        />
                    </div>
                    <div onClick={verifyOTP} className='LoginButton'>
                        <Button title='Verify' widthButton={'270px'} />
                    </div>
                    <p onClick={() => navigate('/signUp')} className='newMember'>
                        Not recieved your code? <span className='join'>Resend</span>
                    </p>
                </div >)}
                {showScreen == "resetPassword" && (<ResetPassword otp={otp} />) }
            </div>{' '}
        </>
    )
}
export default OtpForgotPassword
