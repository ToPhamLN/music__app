import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { TrackAnimation } from '~/components/common'
import style from '~/styles/Card.module.css'

const CardPlaylist = () => {
  return (
    <div className={style.card__playlist}>
      <div className={style.title}>
        <div className={style.image}>
          <img
            src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
            alt='Image Playlist'
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
      <div className={style.playlist__name}>
        <Link to={'/playlist'}>
          playlist name ttt tt tt
        </Link>
      </div>
      <div className={style.playlist__artist}>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
      </div>
    </div>
  )
}

export default CardPlaylist
