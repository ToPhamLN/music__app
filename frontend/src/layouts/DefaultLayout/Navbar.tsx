import React from 'react'
import style from '~/styles/Navbar.module.css'
import logoImage from '~/assets/favicon.ico'
import { Link } from 'react-router-dom'
import SearchNav from '../../components/SearchNav'

const Navbar: React.FC = () => {
  return (
    <div className={style.navbar}>
      <Link to={'/'} className={style.logo}>
        <span className={style.logo__text}>MORRI</span>
        <div className={style.logo__image}>
          <img src={logoImage} alt='Logo' />
        </div>
      </Link>
      <div className={style.nav__dev}>
        <SearchNav />
      </div>
      <div></div>
    </div>
  )
}

export default Navbar
