import React from 'react'
import {
  CardPlaylist,
  Playlist,
  SlickPlaylist,
  SlickPeople
} from '~/components/features'
import style from '~/styles/Search.module.css'
const All = () => {
  return (
    <React.Fragment>
      <div className={style.main}>
        <div className={style.top__result}>
          <h1>Nổi bật</h1>
          <div className={style.container}>
            <CardPlaylist />
          </div>
        </div>
        <div className={style.songs}>
          <h1>Bài hát</h1>
          <Playlist />
          <button className={style.more__watch}>
            Xem thêm
          </button>
        </div>
      </div>
      <div className={style.map}>
        <SlickPlaylist />
      </div>
      <div className={style.map}>
        <SlickPlaylist />
      </div>
      <div className={style.map}>
        <SlickPeople />
      </div>
      <div className={style.map}>
        <SlickPeople />
      </div>
    </React.Fragment>
  )
}

export default All
