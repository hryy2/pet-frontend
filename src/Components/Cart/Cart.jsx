import { useState, useEffect } from 'react'
import './Cart.css'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { HiMiniMinus } from 'react-icons/hi2'
import { IoAdd } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { IoMdHeart } from 'react-icons/io'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartProduct, deleteProductFromCart, getCart } from '../../services/Cart/CartAction'
import { toast } from 'react-toastify'
import ClipLoader from 'react-spinners/ClipLoader'
import { addProductInWishlist } from '../../services/Products/ProductsActions'
import { getWishlist } from '../../services/Wishlist/WishlistAction'
import { applyCoupan, applyCoupanResetState } from '../../services/Coupan/CoupanAction'
import Cookies from 'js-cookie'

const AddToCart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (Cookies.get('LovepetUserToken')) {
      dispatch(applyCoupanResetState())
      dispatch(getCart())
      dispatch(getWishlist())
    }
  }, [])

  const [coupanCode, setCoupanCode] = useState('')
  const cart = useSelector((state) => state.cart)
  const wishlist = useSelector((state) => state.wishlist)
  const coupan = useSelector((state) => state.Coupan)

  const { loading: coupanLoading, cartPriceUsingCoupan, error, isSuccess: couponSuccess } = coupan
  const { Wishlist } = wishlist
  const { Cart, loading } = cart

  const increaseDecreaseQuantity = async (value, product) => {
    const data = {
      productId: product.productId._id,
      quantity: value,
      color: product.color,
      size: product.size,
    }
    await dispatch(addToCartProduct(data))
    await dispatch(getCart())
  }

  const deleteProduct = async (id) => {
    await dispatch(deleteProductFromCart(id))
    await dispatch(getCart())
    toast.success('Removed from cart')
  }

  const addToWishList = async (id) => {
    const isAlreadyInWishlist = Wishlist.wishlist.some((item) => item._id === id)
    if (isAlreadyInWishlist) {
      toast.success('Already in your wishlist')
    } else {
      await dispatch(addProductInWishlist(id))
      toast.success('Added to your wishlist')
      await dispatch(getWishlist())
    }
  }

  const apply = (coupan) => {
    dispatch(applyCoupanResetState())
    dispatch(applyCoupan(coupan))
  }

  return (
    <div className="w-full min-h-[60vh] px-4 md:px-10 py-6">
      {(loading || coupanLoading) && (
        <div className="fixed inset-0 bg-white/70 z-50 flex items-center justify-center">
          <ClipLoader color="#52ab98" size={35} />
        </div>
      )}

      {Cart?.products?.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart Items */}
          <section className="md:w-2/3 space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Your Cart</h2>
            {Cart.products.map((item) => (
              <div key={item._id} className="flex gap-4 p-4 border rounded-xl shadow-sm bg-white">
                <img
                  src={item.productId.images[0]?.url}
                  alt={item.productId.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <p
                      onClick={() => navigate(`/productDetail/${item.productId.slug}`)}
                      className="text-lg font-medium cursor-pointer hover:underline"
                    >
                      {item.productId.title.slice(0, 30)} | {item.productId.brand}
                    </p>
                    <div className="text-right">
                      <p className="text-green-600 font-semibold flex items-center gap-1">
                        <FaIndianRupeeSign />
                        {Math.floor(
                          item.productId.price * item.quantity -
                            (item.productId.price * item.quantity * item.productId.discount) / 100
                        )}
                      </p>
                      <p className="line-through text-sm text-gray-400">
                        <FaIndianRupeeSign size={12} />
                        {item.productId.price * item.quantity}
                      </p>
                      <p className="text-sm text-red-500">{item.productId.discount}% off</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">In Stock</p>
                  <div className="text-sm text-gray-600 flex items-center gap-4">
                    <span>Size: {item.size}</span>
                    <span className="flex items-center gap-1">
                      Color:
                      <span
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: item.color.split('-')[1] }}
                      />
                      {item.color.split('-')[0]}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => item.quantity > 1 && increaseDecreaseQuantity(-1, item)}
                        className={`p-1 rounded-full border ${
                          item.quantity < 2 ? 'text-gray-400' : 'text-red-500'
                        }`}
                      >
                        <HiMiniMinus />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => increaseDecreaseQuantity(1, item)}
                        className="p-1 rounded-full border text-green-600"
                      >
                        <IoAdd />
                      </button>
                    </div>
                    <div className="flex gap-4 mt-2 md:mt-0 text-sm text-gray-700">
                      <button onClick={() => addToWishList(item.productId._id)} className="flex items-center gap-1 text-green-600 hover:underline">
                        <IoMdHeart /> Move to Wishlist
                      </button>
                      <button onClick={() => deleteProduct(item._id)} className="flex items-center gap-1 text-red-600 hover:underline">
                        <MdDelete /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Billing Section */}
          <section className="md:w-1/3 p-4 border rounded-xl bg-white shadow-md">
            <p className="text-sm text-green-600 mb-1">Delivery Free</p>
            <p className="text-sm text-gray-600 mb-4">
              Delivery by:{' '}
              <span className="font-medium">
                {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}
              </span>
            </p>
            {error && <p className="text-red-500 text-sm mb-1">Invalid Coupon</p>}
            {couponSuccess && <p className="text-green-500 text-sm mb-1">Coupon Applied</p>}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="flex-1 border rounded px-3 py-2 text-sm"
                value={coupanCode}
                onChange={(e) => setCoupanCode(e.target.value)}
              />
              <Button title="Apply" onClick={() => apply(coupanCode)} />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  <FaIndianRupeeSign className="inline-block" size={12} /> {Cart.totalPrice}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-red-500">
                  -<FaIndianRupeeSign className="inline-block" size={12} />
                  {cartPriceUsingCoupan ? Cart.totalPrice - cartPriceUsingCoupan : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span>
                  Rs. <strong>{cartPriceUsingCoupan || Cart.totalPrice}</strong>
                </span>
              </div>
            </div>

            <div className="mt-5">
              <Button title="Proceed to Checkout" widthButton="100%" navigation="/checkout" />
              <p
                onClick={() => navigate('/store')}
                className="text-center text-blue-600 text-sm mt-2 hover:underline cursor-pointer"
              >
                Continue Shopping
              </p>
            </div>
          </section>
        </div>
      ) : (
        <div className="text-center mt-10">
          <img
            className="mx-auto w-48"
            src="https://res.cloudinary.com/dytlgwywf/image/upload/v1710181332/djyjxsphr874hu1od7xg.png"
            alt="emptyCart"
          />
          <p className="mt-4 text-lg font-medium">Your cart is empty</p>
          <div className="mt-4">
            <Button
              navigation={Cookies.get('LovepetUserToken') ? '/store' : '/login'}
              title={Cookies.get('LovepetUserToken') ? 'Shop Now' : 'Login'}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddToCart
