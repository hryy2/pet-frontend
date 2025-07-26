import { useSelector, useDispatch } from 'react-redux'
import './Checkout.css'
import React, { useState, useEffect } from 'react'
import { applyCoupan, applyCoupanResetState } from '../../services/Coupan/CoupanAction'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import Button from '../Button/Button'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { userDetail } from '../../services/Authentication/authAction'
import { getCart } from '../../services/Cart/CartAction'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../services/Order/OrderAction'
function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const coupan = useSelector((state) => state.Coupan)
  const user = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.cart)
  const orderLoading = useSelector((state) => state.order.loading)
  const { loading: userDetailLoading, userInformation } = user
  const { Cart, loading } = cart
  const { loading: coupanLoading, cartPriceUsingCoupan, error, isSuccess: couponSuccess } = coupan
  const [orderDetail, setOrderDetail] = useState({
    address: '',
    totalPriceAfterDiscount: '',
    COD: 'true',
  })
  useEffect(() => {
    dispatch(userDetail())
    dispatch(getCart())
  }, [])
  useEffect(() => {
    setOrderDetail((prevOrderDetail) => ({
      ...prevOrderDetail,
      address: userInformation?.address[0],
    }))
  }, [userInformation])
  useEffect(() => {
    setOrderDetail((prevOrderDetail) => ({
      ...prevOrderDetail,
      totalPriceAfterDiscount: cartPriceUsingCoupan || Cart.totalPrice,
    }))
  }, [cartPriceUsingCoupan, Cart])
  const [coupanCode, setCoupanCode] = useState('')
  const apply = (coupan) => {
    dispatch(applyCoupanResetState())
    dispatch(applyCoupan(coupan))
  }
  const placeOrder = async () => {
    await dispatch(createOrder(orderDetail))
    navigate('/order-success')
  }
  return (
    <div className='flex '>
      {(userDetailLoading || coupanLoading || orderLoading) && (
        <div className='loader'>
          <ClipLoader
            color={'#52ab98'}
            loading={userDetailLoading || coupanLoading || orderLoading}
            size={25}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      )}
      <div className='flex flex-col AddToCartPage md:flex-row w-[100%]'>
        <section className=' md:w-2/3 checkoutContainer'>
          <div className='selectAddress w-[100%]'>
            <p className='selectAddress'>Select delivery address</p>
            <div className='addresses'>
              {userInformation &&
                userInformation.address?.map((item) => (
                  <div className='selectaddressBox'>
                    <input
                      type='checkbox'
                      checked={orderDetail.address?._id === item._id}
                      onChange={() =>
                        setOrderDetail((prevOrderDetail) => ({ ...prevOrderDetail, address: item }))
                      }
                      className='checkBoxFilter'
                    />
                    <div>
                      <div className='flex flex-row items-center justify-between'>
                        <p className='font-medium selectaddressName'>
                          {item.name}&nbsp;&nbsp;{item.mobile}
                        </p>
                      </div>
                      <p className='selectaddressDetail'>
                        {item.address},{item.locality},{item.city},{item.state}
                      </p>
                      <p className='text-xs font-medium'>{item.pincode}</p>
                    </div>
                  </div>
                ))}
            </div>
            <p className='codOrder'>Cash on delivery</p>
          </div>
        </section>
        <section className='w-[100%] mt-4 md:mt-0 md:w-1/3 billContainer'>
          <div className='cartBillContainer md:ml-2'>
            <p className='cartDelivery'>Delivery Free</p>
            <p className='cartDeliveryDate'>
              Delivery Date:{' '}
              {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}
            </p>
            <p className='mt-5'></p>
            {error && <p className='invalid'>Invalid Coupon</p>}
            {couponSuccess && <p className='valid'>Coupon applied</p>}
            <div className=' cartCoupan'>
              <input
                value={coupanCode}
                onChange={(e) => setCoupanCode(e.target.value)}
                className='cartPromoCode'
                type='text'
                placeholder='Enter coupon code'
              />
              <div onClick={() => apply(coupanCode)}>
                <Button title={'Apply'} />
              </div>
            </div>
            <div className=' cartPriceContainer'>
              <div className='totalContainer'>
                <p className='subTotal'>Subtotal</p>
                <p className=' subTotal'>
                  <FaIndianRupeeSign size={14} />
                  {Cart.totalPrice}
                </p>
              </div>
              <div className='totalContainer'>
                <p className='smallHeadPrice'>Discount</p>
                <p className='smallHeadPrice'>
                  -<FaIndianRupeeSign size={12} />
                  {cartPriceUsingCoupan ? Cart.totalPrice - cartPriceUsingCoupan : 0}
                </p>
              </div>
              <div className='totalContainer'>
                <p className='smallHeadPrice'>Delivery</p>
                <p className='smallHeadPrice'> Free</p>
              </div>
            </div>
            <div className='totalContainer'>
              <p className='subTotal'>Total Amount</p>
              <p className=' subTotal'>Rs. {cartPriceUsingCoupan || Cart.totalPrice}</p>
            </div>
            <div className='proceedToCheckOut'>
              <p onClick={placeOrder} className='continueShop'>
                Place Order
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Checkout
