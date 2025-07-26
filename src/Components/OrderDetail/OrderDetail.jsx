import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getOrder } from '../../services/Order/OrderAction'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import './OrderDetail.css'
function OrderDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrder())
  }, [])
  const orderState = useSelector((state) => state.order)
  const { loading, Order } = orderState
  return (
    <div className='orderDetail'>
      {Order &&
        Order.map(
          (item) =>
            item._id === id.split('-')[0] &&
            item.products.map(
              (product) =>
                product._id === id.split('-')[1] && (
                  <div className='orderDetailBox'>
                    <div className='delvieryAddress'>
                      <p className='deliveryAddressText'>Delivery address</p>
                      <p className='deliveryAddressName'>
                        {product.address.name}&nbsp;&nbsp;{product.address.mobile}
                      </p>
                      <p className='deliveryAddressDetail'>
                        {product.address.address},{product.address.locality},{product.address.city},
                        {product.address.state}
                      </p>
                      <p className='text-xs font-medium'>{product.address.pincode}</p>{' '}
                    </div>
                    <div className='orderDetailProductDetail'>
                      <img className='myOrderImage' src={product.product?.images[0]?.url} alt='' />

                      <div className='w-[35%]'>
                        <p className='orderProductName '>
                          {product.product?.brand} {product.product?.title}{' '}
                        </p>
                        <p className='orderProductColor'>
                          Color:{product.color?.split('-')[0]}&nbsp;&nbsp;Size:{product.size}{' '}
                        </p>
                      </div>
                      <p className='flex flex-row items-center'>
                        <FaIndianRupeeSign size={14} />
                        {product.product.price}
                      </p>
                    </div>
                  </div>
                ),
            ),
        )}
    </div>
  )
}

export default OrderDetail
