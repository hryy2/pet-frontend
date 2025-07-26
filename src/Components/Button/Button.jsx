import './Button.css'
import { useNavigate } from 'react-router-dom'
// const Button = ({ title, navigation, widthButton, icon }) => {
//   const navigate = useNavigate()
//   return (
//     <button className='button' style={{ width: widthButton }} onClick={() => navigate(navigation)}>
//       {icon && <span className='flex items-center'>{icon}&nbsp;</span>}
//       {title}
//     </button>
//   )
// }
// export default Button
// src/components/Button/Button.jsx

import React from 'react'

const Button = ({ title, onClick, widthButton = '100%', type = 'button', disabled = false, navigation, className = '' }) => {
  const navigate = useNavigate()

  // 如果传入了 navigation 属性，点击按钮时执行跳转
  const handleClick = () => {
    if (navigation) {
      navigate(navigation)
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}  // 使用新的 handleClick 处理逻辑
      className={`
        bg-primary hover:bg-primary-dark text-white font-semibold py-1 px-3
        rounded-xl shadow-md transition duration-300 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{ width: widthButton }}
    >
      {title}
    </button>
  )
}

export default Button

