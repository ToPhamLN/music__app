import React from 'react'
import style from '~/styles/Navbar.module.css'
import logoImage from '~/assets/favicon.ico'
import { Link } from 'react-router-dom'
import { SearchNav } from '~/components/features'
import { useAppSelector } from '~/hooks'

const Navbar: React.FC = () => {
  const profile = useAppSelector((state) => state.profile)
  return (
    <div className={style.navbar}>
      <div className={style.logo}>
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
      <div className={style.login__link}>
        {!profile._id && (
          <>
            <Link to={'/login'}>
              <button>Đăng nhập</button>
            </Link>
            <Link to={'/signup'}>
              <button>Đăng ký</button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
