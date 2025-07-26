import Button from '../Button/Button'
import './TopDeals.css'

const TopDeals = () => {
  return (
    <>
      <div className=' topDealsCard'>
        <div className='cards '>
          <img
            src='https://media.istockphoto.com/id/1798412428/photo/full-length-photo-of-positive-impressed-man-wear-x-mas-green-cardigan-walking-jumping.jpg?s=2048x2048&w=is&k=20&c=jXiwpO7iO6Z5VgzOWTxAJvYK3aYre7V4rKfpt6OqpiU='
            alt=''
            className=' topDealsCardImg'
          />
          <div className=' productCardContent'>
            <p className='topDealsHead'>Lorem ipsum dolor </p>
            <p className='topDealsDiscount'>Min. 40-60% off</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default TopDeals
