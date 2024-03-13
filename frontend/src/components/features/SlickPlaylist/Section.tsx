import React from 'react'
import style from '~/styles/Home.module.css'
import style2 from '~/styles/Card.module.css'
import CardPlaylist from '../CardPlayList'
interface Props {
  setExit: React.Dispatch<React.SetStateAction<boolean>>
}
const Section = (props: Props) => {
  const { setExit } = props
  return (
    <div className={style.section__playlistrow}>
      <div className={style.container}>
        <button
          className={style.exit}
          onClick={() => setExit(false)}
        >
          X
        </button>
        <h1>Dành cho bạn</h1>
        <div className={`${style.wrapper} ${style2.grid}`}>
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

export default Section
