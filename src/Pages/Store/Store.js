import React, { useState, useEffect } from 'react'
import './Store.css'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { PiSortAscendingDuotone } from 'react-icons/pi'
import { IoFilterSharp } from 'react-icons/io5'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { basisSortProduct } from '../../assets/ImportantData/SortBasis'
import { ratingsFilter, Discount } from '../../assets/ImportantData/filterCategory'
import debounce from 'lodash.debounce'
import { CgChevronDown } from 'react-icons/cg'
import { CgChevronUp } from 'react-icons/cg'
import { IoIosStar } from 'react-icons/io'
import { useNavigate, useLocation } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
// import { getColor } from '../../services/Color/ColorAction'
import { getProduct } from '../../services/Products/ProductsActions'
import ClipLoader from 'react-spinners/ClipLoader'
const Store = () => {
  const dispatch = useDispatch()
  // const color = useSelector((state) => state.color.Color)
  const product = useSelector((state) => state.product)
  const { Product, loading } = product
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  // this is used for store differecnt value
  const [showFilter, setShowFilter] = useState(false)
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false)
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(true)
  const [isDiscountDropdownOpen, setIsDiscountDropdownOpen] = useState(true)
  const [checkedColors, setCheckedColors] = useState([])
  // const [checkedRating, setCheckedRating] = useState()
  const [checkedRating, setCheckedRating] = useState('');

  const [checkedDiscount, setCheckedDiscount] = useState()
  const [fromPrice, setFromPrice] = useState('')
  const [toPrice, setToPrice] = useState('')
  const [sortBasis, setSortBasis] = useState('')
  const [showSort, setShowSort] = useState(false)
  
  const [page, setPage] = useState(1)
  //this is handle when user refresh page then filter are still available
  useEffect(() => {
    const colors = queryParams.getAll('color')
    setFromPrice(queryParams.get('price[gte]'))
    setToPrice(queryParams.get('price[lte]'))
    setSortBasis(queryParams.get('sort'))
    setPage(parseInt(queryParams.get('page')) || 1)
    setCheckedColors(colors)
    setCheckedRating(queryParams.get('totalRatings[gte]'))
    setCheckedDiscount(queryParams.get('discount[gte]'))
  }, [location.search])
  //this function is used for handle all checkbox in filter
  const handleCheckboxChange = (type, value) => {
    switch (type) {
      // case 'color':
      //   const newCheckedColors = checkedColors.includes(value)
      //     ? checkedColors.filter((id) => id !== value)
      //     : [...checkedColors, value]
      //   setCheckedColors(newCheckedColors)
      //   updateURL({ colors: newCheckedColors })
      //   break

      case 'sort':
        setSortBasis(value)
        updateURL({ sorts: value })
        break

      case 'rating':
        const ratingValue = value === checkedRating ? null : value
        setCheckedRating(ratingValue)
        updateURL({ ratings: ratingValue })
        break

      case 'discount':
        const discountValue = value === checkedDiscount ? null : value
        setCheckedDiscount(discountValue)
        updateURL({ discounts: discountValue })
        break

      case 'page':
        setPage(value)
        updateURL({ pages: value })
        break

      default:
        break
    }
  }

  //this function is used for update url on this basis of filter
  const updateURL = ({
    colors = checkedColors,
    sorts = sortBasis,
    pages = page,
    ratings: newRatings = checkedRating,
    discounts: newDiscount = checkedDiscount,
    fromPrice: newFromPrice = fromPrice,
    toPrice: newToPrice = toPrice,
  }) => {
    const queryParams = new URLSearchParams()
    colors.forEach((color) => queryParams.append('color', color))

    if (newRatings) {
      queryParams.append('totalRatings[gte]', newRatings)
    }
    if (newRatings != null) {
  queryParams.append('totalRatings[gte]', newRatings)
}

    if (newDiscount) {
      queryParams.append('discount[gte]', newDiscount)
    }
    queryParams.append('sort', sorts)
    queryParams.append('page', pages)
    if (newFromPrice) {
      queryParams.append('price[gte]', newFromPrice)
    }
    if (newToPrice) {
      queryParams.append('price[lte]', newToPrice)
    }

    navigate({ search: queryParams.toString() })
  }

  // Fetch more products when "Load More" is clicked
  // Handle load more logic
  const loadMoreProducts = () => {
    if (Product?.data?.product.length === 0 || Product?.data?.product.length < 8) {
      return // Prevent page change if there are no products or products less than 8
    }
    setPage(prevPage => prevPage + 1)
    updateURL({ pages: page + 1 })
  }


  const debouncedDispatch = debounce((value) => {
    dispatch(getProduct(value))
    // dispatch(getColor())
  }, 200)
  useEffect(() => {
    debouncedDispatch(queryParams.toString())
    return () => debouncedDispatch.cancel()
  }, [queryParams.toString()])

  //this function is for handleFromPriceChange
  const handleFromPriceChange = (e) => {
    const newValue = e.target.value
    setFromPrice(newValue)
    updateURL({ fromPrice: newValue })
  }
  //this function is for handleToPriceChange
  const handleToPriceChange = (e) => {
    const newValue = e.target.value
    setToPrice(newValue)
    updateURL({ toPrice: newValue })
  }
const handleRatingChange = (value) => {
  const ratingValue = value ? parseInt(value, 10) : null;
  setCheckedRating(ratingValue);
  updateURL({ ratings: ratingValue });
};



  //   const handleRatingChange = (e) => {
  //   let value = e === checkedRating ? null : e
  //   setCheckedRating(value)
  //   updateURL({ ratings: value })
  // }

  const handleDiscountChange = (e) => {
    if (e == checkedDiscount) {
      setCheckedDiscount(null)
      updateURL({ discounts: null })
    } else {
      setCheckedDiscount(e)
      updateURL({ discounts: e })
    }
  }
  console.log(queryParams.toString())
  return (
    <>
      <div
        className={`flex w-[screen]  ${isColorDropdownOpen ? `min-h-[100vh]` : `min-h-[77vh]`
          } p-2 store`}
      >
        <section className='productSectionStore w-[100%]'>
          {/* 筛选 + 排序 */}
          <div className='flex md:flex-row flex-col md:items-center justify-between gap-4 px-2 md:px-6 py-4'>
            {/* Customer Ratings */}
            <div className='flex items-center gap-6'>
              <p className='font-medium text-gray-800 dark:text-white'>Customer Ratings:</p>
              <select
                value={checkedRating || ''}
                onChange={(e) => handleRatingChange(e.target.value)}
                className='border border-gray-300 rounded-md px-3 py-1 text-sm dark:bg-gray-800 dark:text-white'
              >
                <option value=''>All Ratings</option>
                {ratingsFilter.map((item) => (
                  <option key={item.rating} value={item.rating}>
                    {item.rating} ★ & above
                  </option>
                ))}
              </select>

            </div>

            {/* Sort By Dropdown */}
            <div className='flex items-center gap-6'>
              <p className='font-medium text-gray-800 dark:text-white'>Sort By:</p>
              <select
                value={sortBasis}
                className='border border-gray-300 rounded-md px-3 py-1 text-sm dark:bg-gray-800 dark:text-white'
                onChange={(e) => handleCheckboxChange('sort', e.target.value)}
              >
                {basisSortProduct.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 显示产品数量 */}
          <div className='px-4 md:px-6 mb-2 text-sm text-gray-600 dark:text-gray-300'>
            Showing {Product?.data?.product?.length != 0 ? (page - 1) * 8 + 1 : 0}-
            {(Product?.data?.product.length != 0 ? (page - 1) * 8 : 0) +
              Product?.data?.product.length}{' '}
            of{' '}
            {(Product?.data?.totalPages - 1) * 8 + Product?.data?.product.length > 8
              ? (Product?.data?.totalPages - 1) * 8 + Product?.data?.product.length
              : Product?.data?.product.length}{' '}
            results{' '}
          </div>

          {/* 产品列表区域 */}
          {loading ? (
            <div className='loader'>
              <ClipLoader color={'#52ab98'} loading={loading} size={25} />
            </div>
          ) : (
            <div className='min-h-[100vh] px-4 md:px-8'>
              {Product?.data?.product?.length > 0 ? (
                <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                  {Product.data.product.map((item) => (
                    <ProductCard key={item._id} data={item} />
                  ))}
                </div>
              ) : (
                <div className='notProductImgCont min-h-[95vh]'>
                  <img
                    className='notProductImg'
                    src='https://myntraweb.blob.core.windows.net/selfserveui/assets/images/cards@3x.png'
                    alt='firstOrder'
                  />
                  <p className='noProductText'>No products available with the selected filters.</p>
                </div>
              )}

              {/* 加载更多 */}
              <div className='loadMoreContainer mt-6'>
                <button
                  onClick={loadMoreProducts}
                  className='loadMoreButton'
                  disabled={loading || Product?.data?.product.length === 0}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            </div>
          )}
        </section>

      </div>
    </>
  )
}

export default Store
