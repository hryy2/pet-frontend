import './ProductDetail.css'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import ReactStars from 'react-rating-stars-component'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import Button from '../Button/Button.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addProductInWishlist, getProductById, resetProductState } from '../../services/Products/ProductsActions.jsx'
import ClipLoader from 'react-spinners/ClipLoader'
import Cookies from 'js-cookie'
import { userDetail } from '../../services/Authentication/authAction.jsx'
import { addToCartProduct, getCart } from '../../services/Cart/CartAction.jsx'

const ProductDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [swiperRef, setSwiperRef] = useState(null)
  const [detailLoading, setDetailLoading] = useState(true)

  // 获取 URL 中的商品 ID
  const { id: getProductId } = useParams()

  useEffect(() => {
    if (!getProductId) {
      console.error('Product ID is undefined');
      return;
    }

    const fetchData = async () => {
      await dispatch(resetProductState())
      await dispatch(getProductById(getProductId))
      await dispatch(userDetail())
      setDetailLoading(false)
    };
    fetchData()
  }, [getProductId, dispatch])

  const product = useSelector((state) => state.product)
  const user = useSelector((state) => state.auth.userInformation)
  const { aProduct } = product

  const [addToCartProductDetail, setAddToCartProductDetail] = useState({
    productId: getProductId,
    quantity: 1,
    color: '',
    size: '',
  })

  const [productImg, setProductImg] = useState()

  // 添加至 Wishlist 的逻辑
  const addInWishlist = async (id) => {
    if (!Cookies.get('LovepetUserToken')) {
      toast.error('Please login to add item in wishlist')
      navigate('/login')
    } else {
      try {
        await dispatch(addProductInWishlist(id))
        await dispatch(userDetail())
        if (user && user.wishlist.find((item) => item == getProductId)) {
          toast.success('Removed from your wishlist')
        } else {
          toast.success('Added to your wishlist')
        }
      } catch (error) {
        console.error('Error occurred while adding to wishlist:', error)
      }
    }
  }

  const addToCart = async () => {
    if (!Cookies.get('LovepetUserToken')) {
      toast.error('Please login to add item in cart')
      navigate('/login')
    } else if (!addToCartProductDetail.color) {
      toast.error('Choose color of product')
    } else if (!addToCartProductDetail.size) {
      toast.error('Choose size of product')
    } else {
      await dispatch(addToCartProduct(addToCartProductDetail))
      await dispatch(getCart())
      toast.success('Added to cart')
    }
  }

  return (
    <>
      {detailLoading ? (
        <div className='loader'>
          <ClipLoader color={'#52ab98'} loading={detailLoading} size={25} />
        </div>
      ) : (
        <section className='product-detail-container'>
          {/* 商品标题与评分部分
          <div className='product-title-rating'>
            <h2 className='product-title'>{aProduct?.title}</h2>
            <div className='product-rating'>
              <ReactStars
                edit={false}
                count={5}
                value={Number(aProduct.totalRatings)}
                size={20}
                activeColor='#FFA534'
                isHalf={true}
              />
              <p>{aProduct.totalRatings}</p>
            </div>
          </div> */}
          {/* 商品标题与评分部分 */}
          <div className='product-title-rating'>
            <h2 className='product-title'>{aProduct?.title}</h2>
            <div className='product-rating'>
              <ReactStars
                edit={false}
                count={5}
                value={Number(aProduct.totalRatings)}
                size={20}
                activeColor='#FFA534'
                isHalf={true}
              />
              <p>{aProduct.totalRatings}</p>
            </div>
          </div>


          {/* 商品图片与信息部分 */}
          <div className='product-detail-content'>
            <div className='product-detail-left'>
              <div className='product-main-image'>
                <div onClick={() => addInWishlist(aProduct?._id)} className='wishlist-icon'>
                  {user && user.wishlist.find((item) => item == getProductId) ? (
                    <FaHeart color='#FF6008' size={20} />
                  ) : (
                    <FaRegHeart size={20} />
                  )}
                </div>
                <img
                  src={productImg || (aProduct?.images?.[0]?.url)}
                  alt='Product Image'
                  className='main-product-image'
                />
              </div>
              <div className='product-thumbnails'>
                {aProduct?.images?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setProductImg(item.url)}
                    className={`thumbnail ${productImg === item.url ? 'selected' : ''}`}
                  >
                    <img
                      src={item.url}
                      alt='Product Thumbnail'
                      className='thumbnail-img'
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className='product-detail-right'>
              <div className='product-price'>
                <p className='price'>
                  <FaIndianRupeeSign size={18} />
                  {Math.floor(aProduct.price - (aProduct.price * aProduct.discount) / 100)}
                </p>
                <p className='discounted-price'>{aProduct.price}</p>
                <p className='discount'>{aProduct.discount}% off</p>
              </div>

              <div className='product-options'>
                <div className='size-selector'>
                  <p>Select Size:</p>
                  <select
                    value={addToCartProductDetail.size}
                    onChange={(e) =>
                      setAddToCartProductDetail({ ...addToCartProductDetail, size: e.target.value })
                    }
                  >
                    <option value=''>Select size</option>
                    {aProduct?.size?.map((item, idx) => (
                      <option key={idx} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className='color-selector'>
                  <p>Select Color:</p>
                  {aProduct?.color?.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() =>
                        setAddToCartProductDetail({ ...addToCartProductDetail, color: item })
                      }
                      className={`color-option ${addToCartProductDetail.color === item ? 'selected' : ''}`}
                      style={{ backgroundColor: item.split('-')[1] }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className='product-description'>
                <p>{aProduct.description}</p>
              </div>

              <div className='product-actions'>
                <div onClick={addToCart}>
                  <Button widthButton={'200px'} title={'Add to Cart'} />
                </div>
                <div onClick={() => addInWishlist(aProduct?._id)}>
                  <Button widthButton={'200px'} title={'Add to Wishlist'} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDetail
