import React from 'react'
import { CardPlaylist } from '~/components/features'
import style from '~/styles/AritstAlbum.module.css'
import style2 from '~/styles/Card.module.css'

const ArtistAlbum = () => {
  return (
    <div className={style.artist__album}>
      <h1>Album của tôi</h1>
      <div className={style2.grid}>
        <CardPlaylist />
        <CardPlaylist />
        <CardPlaylist />
        <CardPlaylist />
      </div>
    </div>
  )
}

export default ArtistAlbum
