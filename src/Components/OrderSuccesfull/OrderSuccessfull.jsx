import React from 'react'
import './OrderSuccessfull.css'
import successfully from '../../assets/images/Successfully Done.gif'
import Button from '../Button/Button'
function OrderSuccessfull() {
  return (
    <div className='orderSuccess'>
      <div className='successBox'>
        <img className='orderSuccessImg' src={successfully} alt='' />
        <p className='orderSuccessText'>Order Successfull</p>
        <p className='orderThankText'>Thank so much for your order.</p>
        <Button title={'Visit Store'} navigation={'/store'} />
      </div>
    </div>
  )
}

export default OrderSuccessfull
