import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'  // 别忘了加 Autoplay 模块！
// import { Pagination, Navigation } from 'swiper/modules'
import { getAllProduct } from '../../services/Products/ProductsActions'
import { getCart } from '../../services/Cart/CartAction'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { useNavigate } from 'react-router-dom'
import './Homepage.css'
import Header from '../../Layouts/Header/Header'
import SearchResults from '../../Components/SearchResults/SearchResults' // 按你文件实际路径

const Homepage = ({ searchResults }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [swiperRef, setSwiperRef] = useState(null)
  const product = useSelector((state) => state.product.Product)
 
  useEffect(() => {
    dispatch(getCart())
    dispatch(getAllProduct())
  }, [])

  // 点击按钮跳转到store页面并附带分类
  const handleCategoryClick = (categoryName) => {
    navigate(`/store?category=${encodeURIComponent(categoryName)}`)
  }

  return (
    <>
      {/* 轮播图 */}
      <div className="w-full flex justify-center items-center py-8 bg-[#f8f8f8]">
        <div className="w-full max-w-[1200px] px-4">
          <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,      // 每 3 秒切换一次
              disableOnInteraction: false, // 用户交互后是否暂停，false 表示不会暂停
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            modules={[Pagination, Autoplay]}  // ✅ 加入 Autoplay 模块
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src="/images/dog-food.jpg"
                alt="Dog Food"
                className="w-full h-[320px] md:h-[420px] object-cover rounded-xl shadow-md"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/banner1.jpg"
                alt="Dog Food 2"
                className="w-full h-[320px] md:h-[420px] object-cover rounded-xl shadow-md"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* 分类按钮区域 */}
      <div className="category-buttons-container my-8 px-4">
        {[
          { name: 'Dog Food', image: '/images/dog-food-icon.png' },
          { name: 'Cat Food', image: '/images/cat-food-icon.png' },
          { name: 'Dog Toy', image: '/images/dog-toy-icon.png' },
          { name: 'Cat Toy', image: '/images/cat-toy-icon.png' },
        ].map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className="category-button flex items-center justify-center bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 p-3 h-20"
          >
            <img src={category.image} alt={category.name} className="w-8 h-8 mr-2 object-contain" />
            <span className="text-sm font-semibold text-gray-800">{category.name}</span>
          </div>
        ))}
      </div>

      <div className="py-6 px-4">
  <h2 className="text-2xl font-semibold mb-4">搜索结果</h2>

  {searchResults.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {searchResults.map(product => (
        <ProductCard key={product._id} data={product} />
      ))}
    </div>
  ) : (
    <p className="text-gray-500">没有找到相关产品。</p>
  )}
</div>


      {/* 产品区 - Top Deals */}
      {product.data && (
        <section className='homeContainer'>
          <p className='pl-1 text-center md:text-left blogMainHead '>Top deals</p>
          <Swiper
            onSwiper={setSwiperRef}
            centeredSlides={true}
            centeredSlidesBounds={true}
            style={{
              '--swiper-navigation-color': 'red',
              '--swiper-navigation-size': '25px',
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1300: { slidesPerView: 5 },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper'
          >
            {product.data.product.map(
              (item) =>
                item.tags.length > 0 && (
                  <SwiperSlide key={item._id}>
                    <ProductCard data={item} />
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </section>
      )}

      {/* 产品区 - Popular Products */}
      {/* {product.data && (
        <section className='homeContainer'>
          <p className='pl-1 text-center md:text-left blogMainHead '>Popular Products</p>
          <Swiper
            onSwiper={setSwiperRef}
            centeredSlides={true}
            centeredSlidesBounds={true}
            style={{
              '--swiper-navigation-color': 'red',
              '--swiper-navigation-size': '25px',
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1300: { slidesPerView: 5 },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper'
          >
            {product.data.product.slice(0, 10).map((item) => (
              <SwiperSlide key={item._id}>
                <ProductCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )} */}
    </>
  )
}

export default Homepage
