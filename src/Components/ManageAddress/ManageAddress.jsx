import './ManageAddress.css'
import React, { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa6'
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { addAddress, deleteAddress } from '../../services/Manage-Address/Manage-AddressAction'
import { userDetail } from '../../services/Authentication/authAction'
function ManageAddress() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userDetail())
  }, [])
  const user = useSelector((state) => state.auth)
  const { loading: userDetailLoading, userInformation } = user
  const [newAddress, setNewAddress] = useState({
    name: '',
    mobile: '',
    alternateMobile: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
  })
  const address = useSelector((state) => state.Address)
  const { loading, isSuccess } = address
  const [openAddAddress, setOpenAddAddress] = useState(false)
  const handleSave = async () => {
    if (
      newAddress.name == '' ||
      newAddress.mobile == '' ||
      newAddress.alternateMobile == '' ||
      newAddress.pincode == '' ||
      newAddress.locality == '' ||
      newAddress.address == '' ||
      newAddress.city == '' ||
      newAddress.state == '' ||
      newAddress.landmark == ''
    ) {
      toast.error('Required all field')
    } else {
      await dispatch(addAddress(newAddress))
      toast.success('Address saved successfully')
      dispatch(userDetail())
      setOpenAddAddress(false)
    }
  }
  const handleChange = (e, fieldName) => {
    setNewAddress((prevState) => ({
      ...prevState,
      [fieldName]: e.target.value,
    }))
  }
  const dltAddress = async (id) => {
    await dispatch(deleteAddress(id))
    dispatch(userDetail())
    toast.success('Deleted successfully')
  }
  return (
    <>
      <div className='manage-address'>
        {!openAddAddress && (
          <p onClick={() => setOpenAddAddress(true)} className='addNewAddressButton'>
            <FaPlus />
            &nbsp;&nbsp;ADD A NEW ADDRESS
          </p>
        )}
        {(loading || userDetailLoading) && (
          <div className='loader'>
            <ClipLoader
              color={'#52ab98'}
              loading={loading || userDetailLoading}
              size={25}
              aria-label='Loading Spinner'
              data-testid='loader'
            />
          </div>
        )}
        {openAddAddress && (
          <div className='addAddressBox'>
            <p className='newAddressHead'>ADD A NEW ADDRESS </p>
            <div className='inputContainer'>
              <div className='twoInputSide md:flex-row flex-col'>
                <input
                  className='inputAddress   mt-5 md:w-[45%] w-[100%]'
                  type='text'
                  value={newAddress.name}
                  onChange={(e) => handleChange(e, 'name')}
                  placeholder='Enter Name'
                />
                <input
                  className='inputAddress    mt-5  md:w-[45%] w-[100%]'
                  type='number'
                  value={newAddress.mobile}
                  onChange={(e) => handleChange(e, 'mobile')}
                  placeholder='10 digit mobile number'
                />
              </div>
              <div className='twoInputSide md:flex-row flex-col'>
                <input
                  value={newAddress.pincode}
                  className='inputAddress   mt-5  md:w-[45%] w-[100%]'
                  type='text'
                  onChange={(e) => handleChange(e, 'pincode')}
                  placeholder='Pincode'
                />
                <input
                  value={newAddress.locality}
                  className='inputAddress   mt-5  md:w-[45%] w-[100%]'
                  type='text'
                  onChange={(e) => handleChange(e, 'locality')}
                  placeholder='Locality'
                />
              </div>
              <div className='twoInputSide md:flex-row flex-col'>
                <textarea
                  value={newAddress.address}
                  onChange={(e) => handleChange(e, 'address')}
                  rows={4}
                  className='textAreaAddress mt-5'
                  type='text'
                  placeholder='Address(Area and Street)'
                />
              </div>
              <div className='twoInputSide md:flex-row flex-col'>
                <input
                  value={newAddress.city}
                  onChange={(e) => handleChange(e, 'city')}
                  className='inputAddress mt-5  md:w-[45%] w-[100%] '
                  type='text'
                  placeholder='City/District/Town'
                />
                <select
                  value={newAddress.state}
                  onChange={(e) => handleChange(e, 'state')}
                  className='inputAddress mt-5  md:w-[45%] w-[100%]'
                  id='stateSelect'
                >
                  <option value=''>Select State</option>
                  {indianStates.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='twoInputSide md:flex-row flex-col'>
                <input
                  value={newAddress.landmark}
                  onChange={(e) => handleChange(e, 'landmark')}
                  className='inputAddress mt-5  md:w-[45%] w-[100%]'
                  type='text'
                  placeholder='Landmark'
                />
                <input
                  value={newAddress.alternateMobile}
                  onChange={(e) => handleChange(e, 'alternateMobile')}
                  className='inputAddress mt-5  md:w-[45%] w-[100%]'
                  type='number'
                  placeholder='Alternate phone number'
                />
              </div>
              <div className='buttonsSaveCancel'>
                <div onClick={handleSave}>
                  <Button navigation={'?tab=Manage Addresses'} widthButton={'100px'} title='Save' />
                </div>
                <p onClick={() => setOpenAddAddress(false)} className='cancel'>
                  Cancel
                </p>
              </div>
            </div>
          </div>
        )}
        <div className='addresses'>
          {userInformation &&
            userInformation.address.map((item) => (
              <div className='addressBox'>
                <div className='flex flex-row items-center justify-between'>
                  <p className='addressName font-medium'>
                    {item.name}&nbsp;&nbsp;{item.mobile}
                  </p>
                  <span onClick={() => dltAddress(item._id)}>
                    <RiDeleteBin6Line className='dltIcon' />
                  </span>
                </div>
                <p className='addressDetail'>
                  {item.address}, {item.locality}, {item.city}, {item.state}
                </p>
                <p className='text-xs font-medium'>{item.pincode}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default ManageAddress

export const indianStates = [
  { id: 1, name: 'Andhra Pradesh' },
  { id: 2, name: 'Arunachal Pradesh' },
  { id: 3, name: 'Assam' },
  { id: 4, name: 'Bihar' },
  { id: 5, name: 'Chhattisgarh' },
  { id: 6, name: 'Goa' },
  { id: 7, name: 'Gujarat' },
  { id: 8, name: 'Haryana' },
  { id: 9, name: 'Himachal Pradesh' },
  { id: 10, name: 'Jharkhand' },
  { id: 11, name: 'Karnataka' },
  { id: 12, name: 'Kerala' },
  { id: 13, name: 'Madhya Pradesh' },
  { id: 14, name: 'Maharashtra' },
  { id: 15, name: 'Manipur' },
  { id: 16, name: 'Meghalaya' },
  { id: 17, name: 'Mizoram' },
  { id: 18, name: 'Nagaland' },
  { id: 19, name: 'Odisha' },
  { id: 20, name: 'Punjab' },
  { id: 21, name: 'Rajasthan' },
  { id: 22, name: 'Sikkim' },
  { id: 23, name: 'Tamil Nadu' },
  { id: 24, name: 'Telangana' },
  { id: 25, name: 'Tripura' },
  { id: 26, name: 'Uttar Pradesh' },
  { id: 27, name: 'Uttarakhand' },
  { id: 28, name: 'West Bengal' },
  { id: 29, name: 'Andaman and Nicobar Islands' },
  { id: 30, name: 'Chandigarh' },
  { id: 31, name: 'Dadra and Nagar Haveli and Daman and Diu' },
  { id: 32, name: 'Delhi' },
  { id: 33, name: 'Lakshadweep' },
  { id: 34, name: 'Puducherry' },
]
