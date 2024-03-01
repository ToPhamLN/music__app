import React from 'react'
import { CardPlaylist } from '~/components/features'
import style from '~/styles/Card.module.css'

const Playlists = () => {
  return (
    <div className={style.map}>
      <h1>Danh sách phát</h1>
      <div className={style.grid}>
        <CardPlaylist />
        <CardPlaylist />
        <CardPlaylist />
        <CardPlaylist />
        <CardPlaylist />
        <CardPlaylist />
      </div>
    </div>
  )
}

export default Playlists
