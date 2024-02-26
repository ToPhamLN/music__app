import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { TrackAnimation } from '~/components/common'
import style from '~/styles/Home.module.css'

const PlaylistGrid: React.FC = () => {
  return (
    <div className={style.parent}>
      <Child />
      <Child />
      <Child />
      <Child />
      <Child />
      <Child />
    </div>
  )
}
export default PlaylistGrid

const Child = () => {
  return (
    <div className={style.child}>
      <div className={style.title}>
        <div className={style.image}>
          <img
            src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
            alt='Playlist Image'
          />
        </div>
        <div className={style.song__animation}>
          <TrackAnimation />
        </div>
        <div className={style.song__play}>
          <button>
            <FaPlay />
          </button>
        </div>
      </div>
      <div className={style.info}>
        <div className={style.playlist__name}>
          <Link> Sống cho hết đời thanh xuân</Link>
        </div>
      </div>
    </div>
  )
}
