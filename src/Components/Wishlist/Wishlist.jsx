import Layout from '../../Layouts/Layout/Layout'
import './Wishlist.css'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWishlist } from '../../services/Wishlist/WishlistAction'
import ClipLoader from 'react-spinners/ClipLoader'
import Button from '../Button/Button'
import Cookies from 'js-cookie'
const Wishlist = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (Cookies.get('token')) {
      dispatch(getWishlist())
    }
  }, [])

  const wishlist = useSelector((state) => state.wishlist)
  const { loading, Wishlist } = wishlist
  return (
    <>
      <div className='flex justify-center items-center min-h-[70vh]'>
        {Wishlist?.wishlist?.length > 0 ? (
          <div className='grid justify-between grid-cols-2 gap-0 md:grid-cols-5 wishListContainer '>
            {loading && (
              <div className='loader'>
                <ClipLoader
                  color={'#52ab98'}
                  loading={loading}
                  size={25}
                  aria-label='Loading Spinner'
                  data-testid='loader'
                />
              </div>
            )}
            {Wishlist.wishlist.map((item) => (
              <ProductCard data={item} />
            ))}
          </div>
        ) : (
          <div className='emptyWishlist '>
            <img
              src='https://res.cloudinary.com/dytlgwywf/image/upload/v1710253047/wvgsjhush23todrat6pq.png'
              width={400}
              alt='emptyCart'
            />
            <p className='emptyText'>Your wishlist is empty</p>
            <div className='flex justify-center'>
              {Cookies.get('LovepetUserToken') ? (
                <Button navigation={'/store'} title={'Visit Store'} />
              ) : (
                <Button navigation={'/login'} title={'Login'} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default Wishlist
