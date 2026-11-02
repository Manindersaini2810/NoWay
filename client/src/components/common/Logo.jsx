import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.png'

const Logo = ({ size = 'md', light = false, className = '' }) => {
  const sizeMap = {
    sm: {
      img: 'h-8 w-8 rounded-lg',
      text: 'text-lg',
    },
    md: {
      img: 'h-10 w-10 rounded-xl',
      text: 'text-xl',
    },
    lg: {
      img: 'h-12 w-12 rounded-2xl',
      text: 'text-2xl',
    },
  }

  const currentSize = sizeMap[size] || sizeMap.md

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-95 ${className}`}
    >
      <div
        className={`${currentSize.img} flex-shrink-0 overflow-hidden bg-[#1f1f1f] shadow-sm transition-transform duration-200 group-hover:scale-105`}
      >
        <img
          src={logoImg}
          alt="NoWay Estate Logo"
          className="h-full w-full object-cover"
        />
      </div>

      <span
        className={`hidden min-[375px]:inline-block font-bold tracking-tight ${currentSize.text} select-none`}
      >
        <span className={light ? 'text-white' : 'text-[#111827]'}>NoWay</span>{' '}
        <span className="text-teal-600">Estate</span>
      </span>
    </Link>
  )
}

export default Logo

