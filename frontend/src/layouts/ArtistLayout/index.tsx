import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '~/hooks'
import Navbar from './Navbar'
import Footer from '../DefaultLayout/Footer'
import Sidebar from './Sidebar'
import Notification from './Notification'

const ArtistLayout: React.FC = () => {
  const { theme } = useAppSelector(
    (state) => state.settings
  )
  const location = useLocation()

  useEffect(() => {
    const mainElement = document.querySelector('.main')
    if (mainElement) {
      mainElement.scrollTo(0, 0)
    }
  }, [location])

  return (
    <div
      className={`app ${theme ? 'dark__theme' : 'light__theme'}`}
    >
      <Navbar />
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <Outlet />
          <Footer />
        </div>
      </div>
      <Notification />
    </div>
  )
}

export default ArtistLayout
