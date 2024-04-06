import React, { useState } from 'react'
import CoffeeIcon from '@mui/icons-material/Coffee'
import { Link, useLocation } from 'react-router-dom'

const Footer: React.FC = () => {
  const location = useLocation()
  const [, setSelectedOption] = useState('')

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
  }

  return (
    <div className='flex items-center justify-center space-x-5 fixed w-full h-20 bg-transparent rounded-t-sm bottom-0'>
      <Link
        to={'/'}
        className={`flex flex-col items-center justify-center ${
          location.pathname === '/' ||
          location.pathname === '/schedule' ||
          location.pathname === '/confirm' ||
          location.pathname === '/success'
            ? 'selected'
            : ''
        }`}
        onClick={() => handleOptionClick('reserve')}
      >
        <CoffeeIcon
          sx={{ fontSize: 30 }}
          className={
            location.pathname === '/' ||
            location.pathname === '/schedule' ||
            location.pathname === '/confirm' ||
            location.pathname === '/success'
              ? 'text-violet-800'
              : 'text-gray-700'
          }
        />
        <p
          className={
            location.pathname === '/' ||
            location.pathname === '/schedule' ||
            location.pathname === '/confirm' ||
            location.pathname === '/success'
              ? 'text-violet-800 font-bold'
              : 'text-gray-700 font-bold'
          }
        >
          Reservar
        </p>
        {(location.pathname === '/' ||
          location.pathname === '/schedule' ||
          location.pathname === '/confirm' ||
          location.pathname === '/success') && <div className='line' />}
      </Link>
      <Link
        to={'/appointments'}
        className={`flex flex-col items-center justify-center ${
          location.pathname === '/appointments' ? 'selected' : ''
        }`}
        onClick={() => handleOptionClick('myTurns')}
      >
        <CoffeeIcon
          sx={{ fontSize: 30 }}
          className={
            location.pathname === '/appointments'
              ? 'text-violet-800'
              : 'text-gray-700'
          }
        />
        <p
          className={
            location.pathname === '/appointments'
              ? 'text-violet-800 font-bold'
              : 'text-gray-700 font-bold'
          }
        >
          Mis turnos
        </p>
        {location.pathname === '/appointments' && <div className='line' />}
      </Link>
    </div>
  )
}

export default Footer
