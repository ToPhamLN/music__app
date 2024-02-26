import React from 'react'
import {
  HomeSlick,
  SlickFramer
} from '~/components/features'
import style from '~/styles/Home.module.css'
import { PlaylistGrid } from '../../components/features'
const HomePage: React.FC = () => {
  return (
    <div className={style.home}>
      <HomeSlick />
      <div className={style.playlist__row}>
        <div className={style.header}>
          <h1>Nghe gần đây</h1>
          <span>Xem tất cả</span>
        </div>
        <PlaylistGrid />
      </div>
      <div className={style.playlist__row}>
        <div className={style.header}>
          <h1>Dành cho bạn</h1>
          <span>Xem tất cả</span>
        </div>
        <SlickFramer />
      </div>
    </div>
  )
}

export default HomePage
