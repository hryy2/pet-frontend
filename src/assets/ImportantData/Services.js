import { LiaShippingFastSolid } from 'react-icons/lia'
import { IoPricetagsOutline } from 'react-icons/io5'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { BiSupport } from 'react-icons/bi'
import { CiGift } from 'react-icons/ci'
export const services = [
  {
    icon: <LiaShippingFastSolid />,
    services1: 'Free Shipping',
    services2: 'From all order above ₹500',
  },
  { icon: <CiGift />, services1: 'Daily Surprise Offers', services2: 'Save upto 25% off' },
  { icon: <BiSupport />, services1: 'Support 24/7', services2: 'Shop with an expert' },
  {
    icon: <IoPricetagsOutline />,
    services1: 'Affordable Price',
    services2: 'Get Factory Default Price',
  },
  {
    icon: <RiSecurePaymentLine />,
    services1: 'Secure Payments',
    services2: '100% Protected Payment',
  },
]
