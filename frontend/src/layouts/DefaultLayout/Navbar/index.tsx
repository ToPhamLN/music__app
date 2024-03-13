import React from 'react'
import style from '~/styles/Navbar.module.css'
import logoImage from '~/assets/favicon.ico'
import { Link } from 'react-router-dom'
import { SearchNav } from '~/components/features'
import { MdMenu } from 'react-icons/md'
import { useAppDispatch } from '~/hooks'
import { setIsSidebar } from '~/reduxStore/globalSlice'
import Auth from './Auth'

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleMount = () => dispatch(setIsSidebar())
  return (
    <div className={style.navbar}>
      <div className={style.logo}>
        <button
          className={style.menu__sidebar}
          onClick={handleMount}
        >
          <MdMenu />
        </button>
        <Link to={'/'} className={style.link__logo}>
          <span className={style.logo__text}>MORRI</span>
          <div className={style.logo__image}>
            <img src={logoImage} alt='Logo' />
          </div>
        </Link>
      </div>
      <div className={style.nav__center}>
        <SearchNav />
      </div>
      <Auth />
      {/* <div className={style.login__link}>
        <Link to={'/login'}>
          <button>Đăng nhập</button>
        </Link>
        <Link to={'/signup'}>
          <button>Đăng ký</button>
        </Link>
      </div> */}
    </div>
  )
}

export default Navbar
