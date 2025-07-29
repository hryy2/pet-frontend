
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './Header.css'
import Button from '../../Components/Button/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { pages } from '../../assets/ImportantData/pagesNameAndPath'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory, getCategory } from '../../services/Category/CategoryActions'
import { getCart } from '../../services/Cart/CartAction'
import debounce from 'lodash.debounce'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

const Header = ({ setSearchResults, searchResults }) => {
  const location = useLocation();
  const token = Cookies.get('LovepetUserToken');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hamBurger, setHamBurger] = useState(false);
  const [SearchDiv, setSearchDiv] = useState(true);
  const divRef = useRef(null);
  const [query, setQuery] = useState('');

  // 获取商品和购物车数据
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getCart());
  }, [dispatch]);


  const debouncedDispatch = debounce(async (value) => {
    if (value) {
      try {
        const response = await fetch(`https://pet-backend-ohfi.onrender.com/api/product/search?query=${value}`);
        const data = await response.json();
        setSearchResults(data.data);  // Pass search results to parent
      } catch (err) {
        console.error('Error fetching search results:', err);
      }
    }
  }, 200);

 useEffect(() => {
    if (query.trim() !== '') {
      debouncedDispatch(query);
    } else {
      setSearchResults([]);  // 如果没有搜索内容，清空搜索结果
    }
    return () => debouncedDispatch.cancel();
  }, [query, setSearchResults]); // 将setSearchResults作为依赖传入

  const cart = useSelector((state) => state.cart.Cart);
  // const searchResults = useSelector((state) => state.product.productsByKeyword);  // 获取搜索结果
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setSearchDiv(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='w-[screen]'>
      <nav className='z-20 shadow navBar md:block md:items-center bg-[#00205B]'>
        <div className='justify-between block p-4 md:p-4 md:flex first'>
          <div className='flex flex-wrap items-center md:w-full box'>
            <div className='flex items-center box1' onClick={() => navigate('/')}>
              <img className='inline h-6 md:h-8 logo' src={logo} alt='' />
              <span className="text-xl md:text-2xl name">
                <Link to="/">
                  <b style={{
                    fontSize: 50,
                    color: 'white',
                    fontFamily: "'Pacifico', cursive",
                    letterSpacing: '1px',
                    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)'
                  }}>
                    Lovepet
                  </b>
                </Link>
              </span>
            </div>
            <div ref={divRef} className='md:flex-1 order-2 flex-[100%]'>
              <div
                onClick={() => setSearchDiv(true)}
                className='flex items-center md:my-0 mt-2 justify-between w-[100vw] md:w-[60vw] searchBox'
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    debouncedDispatch(e.target.value);
                  }}
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 rounded-full focus:outline-none"
                />
                <span
                  className='text-xl p-[10px] md:p-2 md:text-2xl searchIcon cursor-pointer'
                  onClick={() => {
                    debouncedDispatch(query);
                    setSearchDiv(true);
                  }}
                >
                  <RiSearchLine color='black' />
                </span>
              </div>
             {/* {SearchDiv && searchResults && (
                <div className='searchField md:w-[40vw] w-[90vw] bg-white rounded shadow-md mt-2 p-2'>
                  <p style={{ padding: '10px', color: 'red' }}>当前结果数量：{searchResults.length}</p>
                  {searchResults.slice(0, 10).map((item) => (
                    <p
                      key={item._id}
                      onClick={() => navigate(`/product/${item._id}`)}
                      className='searchValue cursor-pointer hover:bg-gray-100 p-2 rounded flex items-center'
                    >
                      <RiSearchLine size={14} color='grey' />
                      &nbsp;&nbsp;{item.price}
                    </p>
                  ))}
                </div>
              )} */}
            </div>
            <div className='flex-col items-end justify-end flex-1 order-2 md:flex md:order-3 box3'>
              <div className='flex justify-end gap-1 md:gap-1 items-center pr-2'>
                {/* Wishlist */}
                <div className="header-icon-group" onClick={() => navigate('/wishlist')}>
                  <img src='/images/wishlist.png' alt="Wishlist" className="icon" />
                  <span className="icon-text text-white">Wishlist</span>
                </div>
                {/* Cart */}
                <div className="header-icon-group relative" onClick={() => navigate('/cart')}>
                  <img src='/images/cart2.png' alt="Cart" className="icon" />
                  {cart?.products?.length > 0 && token && (
                    <div className="cart-badge">{cart.products.length}</div>
                  )}
                  <span className="icon-text text-white">Cart</span>
                </div>
                {/* Profile */}
                {token ? (
                  <div className="header-icon-group" onClick={() => navigate('/userprofile?tab=My Account')}>
                    <img src='/images/personal.png' alt="Profile" className="icon" />
                    <span className="icon-text text-white">Profile</span>
                  </div>
                ) : (
                  !isLoginPage && (
                    <div className="header-icon-group" onClick={() => navigate('/login')}>
                      <img src='/images/user.png' alt="Login" className="icon" />
                      <span className="icon-text text-white">Login</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
 <ul
          className={`navSecond bg-[#004AAD] md:flex md:justify-center ${hamBurger ? 'opacity-100 left-[0px]' : 'opacity-0'} md:items-center z-[1] md:z-auto md:static w-full left-0 md:w-auto md:py-0 py-2 md:pl-0 pl-7 md:opacity-100 absolute opacity-0 transition-all ease-out duration-500`}
        >
          {hamBurger && !isLoginPage && (
            <div className='flex items-center justify-between md:hidden'>
              {!isLoginPage && token === null && (
                <li className='mx-6 my-4 hamlink md:my-0 text-white font-semibold'>
                  <NavLink onClick={() => setHamBurger(!hamBurger)} to='/login'>
                    Login
                  </NavLink>
                </li>
              )}
              {token !== null && (
                <li className='mx-6 my-4 hamlink md:my-0 text-white font-semibold'>
                  <NavLink onClick={() => setHamBurger(!hamBurger)} to='/userProfile'>
                    Profile
                  </NavLink>
                </li>
              )}
            </div>
          )}

          {pages.map((item) => (
            <div key={item.name} className='flex items-center justify-between'>
              <li className='mx-6 my-4 link md:my-0 text-white font-semibold'>
                <NavLink
                  onClick={() => setHamBurger(!hamBurger)}
                  className={({ isActive }) => `nav-link ${isActive ? 'underline' : ''}`}
                  to={`${item.route}`}
                >
                  {item.name}
                </NavLink>
              </li>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
