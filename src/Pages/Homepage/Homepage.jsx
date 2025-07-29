import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { getAllProduct } from '../../services/Products/ProductsActions';
import { getCart } from '../../services/Cart/CartAction';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = ({ searchResults }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [swiperRef, setSwiperRef] = useState(null);
  const product = useSelector((state) => state.product.Product);

  useEffect(() => {
    dispatch(getCart());
    dispatch(getAllProduct());
  }, [dispatch]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/store?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <>
      {/* 轮播图 */}
      {/* <div className="w-full flex justify-center items-center bg-[#f2f2f2]"> */}
        <div className="w-screen overflow-hidden bg-[#f2f2f2]">
          <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="mySwiper !m-0 !p-0 w-full max-w-[100vw]"
          >
            <SwiperSlide className="!w-full">
              <img
                src="/images/banner1.png"
                alt="Dog Food 1"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="!w-full">
              <img
                src="/images/banner4.png"
                alt="Cat Food 1"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="!w-full">
              <img
                src="/images/banner2.png"
                alt="Dog Food 2"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="!w-full">
              <img
                src="/images/banner5.png"
                alt="Cat Food 2"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="!w-full">
              <img
                src="/images/banner3.png"
                alt="Dog Food 3"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      {/* </div> */}

      {/* 分类按钮区域 */}
      <div className="bg-white py-6">
        <div className="max-w-[1440px] mx-auto flex flex-wrap justify-around px-4 gap-y-6">
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
              <img src={category.image} alt={category.name} className="w-8 h-8 mr-3" />
              <span className="text-sm font-medium text-gray-800">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 搜索结果区域 */}
      <div className="py-10 px-4 max-w-[1440px] mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Search Result</h2>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product._id} data={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No relevant products were found.</p>
        )}
      </div>

      {/* 产品区 - Top Deals */}
      {product.data && (
        <section className="py-10 px-4 bg-[#f9f9f9]">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center md:text-left">Top Deals</h2>
            <Swiper
              onSwiper={setSwiperRef}
              centeredSlides={true}
              centeredSlidesBounds={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1300: { slidesPerView: 5 },
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
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
          </div>
        </section>
      )}
    </>
  );
};

export default Homepage;
