import React, { useState } from 'react'
import { useAppSelector } from '~/hooks/redux'
import style from '~/styles/Footer.module.css'
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'

const TrackFooter: React.FC = () => {
  const [like, setLike] = useState<boolean>(false)
  const { track } = useAppSelector((state) => state.trackPlay)
  return (
    <div className={style.track__info}>
      <div className={style.track__img}>
        <img
          src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
          alt='Poster Track'
        />
      </div>
      <div>
        <h1 className={style.track__name}>{track?.name}</h1>
        <p className={style.track__artist}>
          {track?.artist?.name}
        </p>
      </div>
      <button
        className={style.track__like}
        hover-content={'Lưa vào Thư viện'}
      >
        {like ? <IoHeartSharp /> : <IoHeartOutline />}
      </button>
    </div>
  )
}

export default TrackFooter
