import { useState, useEffect, useRef } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { userDetail, userDetailUpdate } from '../../services/Authentication/authAction'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import Button from '../Button/Button'
import './MyAccount.css'


const MyAccount = () => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)

  const [editPi, setEditPi] = useState(false)
  const user = useSelector((state) => state.auth)
  const { loading, userInformation } = user

  const [updateDetail, setUpdateDetail] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dateOfBirth: 'mm/dd/yyyy',
    gender: '',
  })

  useEffect(() => {
    dispatch(userDetail())
  }, [])

  useEffect(() => {
    if (!loading && userInformation) {
      setUpdateDetail({
        firstName: userInformation?.firstName || '',
        lastName: userInformation?.lastName || '',
        email: userInformation?.email || '',
        mobile: userInformation?.mobile || '',
        dateOfBirth: moment(userInformation?.dateOfBirth).format('YYYY-MM-DD'),
        gender: userInformation?.gender || '',
      })
    }
  }, [userInformation, loading])

  const handleChange = (e, fieldName) => {
    setUpdateDetail((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }))
  }

  const update = async () => {
    try {
      await dispatch(userDetailUpdate(updateDetail))
      await dispatch(userDetail())
      toast.success('Updated Successfully')
      setEditPi(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-full px-4 md:px-10 py-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Personal Information</h2>
          {loading && <ClipLoader color="#52ab98" loading={loading} size={25} />}
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start mb-6 gap-4">
          <img
            className="w-28 h-28 rounded-full object-cover border border-gray-300"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbI78v3a7Q5Tcm1DrdpZ7KEH2-ArooT9qzvFe6cLOYxy4wY-hp6dG-NrJKyv9_n5Hcjs&usqp=CAU"
            alt="Profile"
          />
          <button
            onClick={() => {
              setEditPi(!editPi)
              inputRef.current?.focus()
            }}
            className="flex items-center gap-2 text-sm text-primary hover:underline mt-2 md:mt-0"
          >
            <FaRegEdit />
            Change Profile Information
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
            <input
              ref={inputRef}
              type="text"
              value={updateDetail.firstName}
              readOnly={!editPi}
              onChange={(e) => handleChange(e, 'firstName')}
              className={`w-full mt-1 px-4 py-2 rounded-lg border ${editPi ? 'text-black dark:text-white' : 'text-gray-400'} bg-gray-100 dark:bg-gray-700`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
            <input
              type="text"
              value={updateDetail.lastName}
              readOnly={!editPi}
              onChange={(e) => handleChange(e, 'lastName')}
              className={`w-full mt-1 px-4 py-2 rounded-lg border ${editPi ? 'text-black dark:text-white' : 'text-gray-400'} bg-gray-100 dark:bg-gray-700`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              type="text"
              value={updateDetail.mobile}
              readOnly={!editPi}
              onChange={(e) => handleChange(e, 'mobile')}
              className={`w-full mt-1 px-4 py-2 rounded-lg border ${editPi ? 'text-black dark:text-white' : 'text-gray-400'} bg-gray-100 dark:bg-gray-700`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="text"
              value={updateDetail.email}
              readOnly={!editPi}
              onChange={(e) => handleChange(e, 'email')}
              className={`w-full mt-1 px-4 py-2 rounded-lg border ${editPi ? 'text-black dark:text-white' : 'text-gray-400'} bg-gray-100 dark:bg-gray-700`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
            <input
              type="date"
              value={updateDetail.dateOfBirth}
              readOnly={!editPi}
              onChange={(e) => handleChange(e, 'dateOfBirth')}
              className={`w-full mt-1 px-4 py-2 rounded-lg border ${editPi ? 'text-black dark:text-white' : 'text-gray-400'} bg-gray-100 dark:bg-gray-700`}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
            <div className="flex flex-col mt-2 gap-1 text-sm text-gray-700 dark:text-gray-300">
              {['male', 'female', 'preferNotToSay'].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={updateDetail.gender === g}
                    disabled={!editPi}
                    onChange={(e) => handleChange(e, 'gender')}
                    className="accent-primary"
                  />
                  {g === 'preferNotToSay' ? 'Prefer Not to Say' : g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>

        {editPi && (
          <div className="mt-4">
            <div onClick={update}>
              <Button widthButton="100%" title="Save Information" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAccount
