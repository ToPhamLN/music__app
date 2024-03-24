import { Link } from 'react-router-dom'
import style from '~/styles/Card.module.css'
import { DListTrack } from '~/types/data'
interface Props {
  listTrack: DListTrack
}
const CardPlaylist = ({ listTrack }: Props) => {
  const { photo, title, category, slug, _id } = listTrack

  return (
    <div className={`${style.card__playlist} `}>
      <div className={style.title}>
        <div className={style.image}>
          <img src={photo.path} alt='Image Playlist' />
        </div>
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
