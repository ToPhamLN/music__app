import React from 'react'
import {
  HomeSlick,
  SlickPlaylist
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
        </div>
        <PlaylistGrid />
      </div>
      <div className={style.map}>
        <SlickPlaylist />
      </div>
    </div>
  )
}

export default HomePage
