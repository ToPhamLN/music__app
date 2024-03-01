import React from 'react'
import style from '~/styles/Mylist.module.css'
import style2 from '~/styles/Card.module.css'
import { CardPlaylist } from '~/components/features'

const Mylist = () => {
  return (
    <div className={style.mylist}>
      <div className={style.map}>
        <h1>Danh sách của tôi</h1>
        <div className={style2.grid}>
          <CardPlaylist />
          <CardPlaylist />
          <CardPlaylist />
          <CardPlaylist />
          <CardPlaylist />
          <CardPlaylist />
        </div>
      </div>
    </div>
  )
}

export default Mylist
