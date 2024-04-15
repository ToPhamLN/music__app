import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { TrackAnimation } from '~/components/common'
import { ERole } from '~/constants/enum'
import { useAppSelector } from '~/hooks'
import style from '~/styles/Card.module.css'
import { DListTrack } from '~/types/data'
interface Props {
  listTrack: DListTrack
}
const CardPlaylist = ({ listTrack }: Props) => {
  return <div>card</div>
  const { photo, title, category, slug, _id } = listTrack
  const { role } = useAppSelector((state) => state.profile)

  return (
    <div className={`${style.card__playlist} `}>
      <div className={style.title}>
        <div className={style.image}>
          <img src={photo.path} alt='Image Playlist' />
        </div>
        {role === ERole.USER && (
          <>
            <div className={style.song__animation}>
              <TrackAnimation />
            </div>
            <div className={style.song__play}>
              <button>
                <FaPlay />
              </button>
            </div>
          </>
        )}
      </div>
      <div className={style.playlist__name}>
        <Link
          to={`/${category.toLowerCase()}/${slug}${_id}.html`}
        >
          {title}
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
