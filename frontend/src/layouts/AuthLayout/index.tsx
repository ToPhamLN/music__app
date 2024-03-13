import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../DefaultLayout/Footer'
import { useAppSelector } from '~/hooks'

export const AuthLayout = () => {
  const { theme } = useAppSelector(
    (state) => state.settings
  )
  return (
    <div
      className={`app ${theme ? 'dark__theme' : 'light__theme'}`}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AuthLayout
