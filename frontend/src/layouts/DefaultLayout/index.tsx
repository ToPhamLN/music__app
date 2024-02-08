import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '~/hooks/redux'
import Navbar from './Navbar'
import Footer from './Footer'
import Sidebar from './Sidebar'
import Viewbar from './Viewbar'

const DefaultLayout: React.FC = () => {
  const { theme } = useAppSelector((state) => state.settings)
  const { view } = useAppSelector((state) => state.global)
  return (
    <div
      className={`app ${theme ? 'dark__theme' : 'light__theme'}`}
    >
      <Navbar />
      <div className='container'>
        <Sidebar />
        <div className='main'>
          <Outlet />
        </div>
        {view.isView && <Viewbar />}
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
