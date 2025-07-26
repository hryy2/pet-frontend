import React, { useEffect, useRef } from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/images/Animation - 1709476015628.json'

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return <Lottie options={defaultOptions} height={650} width={650} />
}

export default NotFound
