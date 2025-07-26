import './ProductCard.css'
import ReactStars from 'react-rating-stars-component'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ data }) => {
  const navigate = useNavigate()

  // 安全处理图片 URL
  const imageUrl =
    Array.isArray(data?.images) && data.images[0]?.url
      ? data.images[0].url
      : 'https://res.cloudinary.com/dytlgwywf/image/upload/v1709644422/tlbnraoyd03bekjtyuzk.jpg'

  // 安全处理品牌和标题，避免空字符串或 undefined 报错
  const brand = data?.brand || '品牌未知'
  const title = data?.title || '产品名称'

  // 安全处理评分，保证为 0~5 之间
  const rating =
    typeof data?.totalRatings === 'number' && data.totalRatings >= 0
      ? data.totalRatings
      : 0

  // 安全处理价格和折扣
  const price = typeof data?.price === 'number' ? data.price : 0
  const discount = typeof data?.discount === 'number' ? data.discount : 0
  const discountedPrice = Math.floor(price - (price * discount) / 100)

  return (
    <div
      className='productCard'
      onClick={() => navigate(`/productdetail/${data?._id}`)}
    >
      <div className='ProductCards'>
        <div className='productCardImgContainer'>
          {/* <p className={`cardTags ${data?.tags}`}>{data?.tags}</p> */}
          <img src={imageUrl} alt='product' className='productCardImg' />
        </div>

        <div className='productCardContent'>
          <p className='productCompany'>{brand.slice(0, 20)}</p>
          <p className='productHead'>{title.slice(0, 20)}</p>

          <ReactStars
            edit={false}
            count={5}
            value={rating}
            size={20}
            activeColor='#FFA534'
          />

          <div className='flex items-center mt-1'>
            <p className='productCardPrice'>
              <FaIndianRupeeSign size={12} />
              <span>{discountedPrice}</span>
            </p>
            <p className='productCardBeforePrice'>{price}</p>
            <p className='productCardDiscount'>{discount}% off</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
