import React, { useEffect, useState } from 'react'
import './MyOrder.css'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../services/Order/OrderAction'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import { userDetail } from '../../services/Authentication/authAction'
import { postRating } from '../../services/Rating/RatingAction'
import { toast } from 'react-toastify'

function MyOrder() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [star, setStar] = useState(0)
  const [prodId, setProdId] = useState('')

  useEffect(() => {
    dispatch(getOrder())
    dispatch(userDetail())
  }, [])

  const user = useSelector((state) => state.auth)
  const { userInformation } = user
  const orderState = useSelector((state) => state.order)
  const { Order } = orderState

  useEffect(() => {
    const fetchData = async () => {
      if (star !== 0) {
        await dispatch(postRating({ prodId: prodId, star: star }))
        toast.success(`Thank you for your feedback`)
        await dispatch(getOrder())
      }
    }
    fetchData()
  }, [star])

  return (
    <div className='myOrderBox'>
      {Order && Order.length > 0 ? (
        Order.map((item) =>
          item.products.map((product) => (
            <div className='orderBox'>
              <img className='myOrderImage' src={product.product?.images[0]?.url} alt={product.product?.title} />
              <div className='orderProductDetail'>
                <div className='productInfo'>
                  <p
                    onClick={() => navigate(`/order-detail/${item._id}-${product._id}`)}
                    className='orderProductName'
                  >
                    {product.product?.brand} {product.product?.title}
                  </p>
                  <p className='orderProductDetails'>
                    Color: {product.color?.split('-')[0]} | Size: {product.size} | Quantity: {product.count}
                  </p>
                </div>

                <div className='ratingAndPrice'>
                  {!product?.product?.ratings || product.product.ratings.length === 0 ? (
                    <ReactStars
                      edit={true}
                      count={5}
                      value={star}
                      onChange={(newValue) => {
                        setStar(newValue)
                        setProdId(product.product._id)
                      }}
                      size={20}
                      activeColor='#FFA534'
                      isHalf={true}
                    />
                  ) : (
                    product.product.ratings.map((rating) =>
                      rating.postedBy !== userInformation?._id ? (
                        <ReactStars
                          edit={true}
                          count={5}
                          value={star}
                          onChange={(newValue) => {
                            setStar(newValue)
                            setProdId(product.product._id)
                          }}
                          size={20}
                          activeColor='#FFA534'
                          isHalf={true}
                        />
                      ) : (
                        <ReactStars
                          edit={false}
                          count={5}
                          value={rating.star}
                          size={20}
                          activeColor='#FFA534'
                          isHalf={true}
                        />
                      )
                    )
                  )}
                  <p className='orderPrice'>
                    <FaIndianRupeeSign size={14} />
                    {Math.floor(
                      product.product.price * product.count -
                        (product.product.price * product.count * product.product.discount) / 100
                    )}
                  </p>
                </div>

                <div className={`orderStatus ${item.orderStatus === 'Cancelled' ? 'cancelled' : ''}`}>
                  {item.orderStatus}
                </div>
              </div>
            </div>
          ))
        )
      ) : (
        <div className='noOrdersMessage'>
          <p>You haven't placed any order yet!</p>
        </div>
      )}
    </div>
  )
}

export default MyOrder
