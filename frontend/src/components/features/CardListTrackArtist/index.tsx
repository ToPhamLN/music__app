import { Link } from 'react-router-dom'
import style from '~/styles/Card.module.css'
import { DListTrack } from '~/types/data'
interface Props {
  listTrack: DListTrack
  type?: string
}
const CardPlaylist = ({ listTrack, type }: Props) => {
  const { photo, title, category, slug, _id, description } =
    listTrack
  return (
    <div className={`${style.card__playlist} `}>
      <div className={style.title}>
        <div className={style.image}>
          <img
            src={photo?.path || '/src/assets/disc.png'}
            alt='Image Playlist'
          />
        </div>
      </div>
      <div className={style.playlist__name}>
        <Link
          to={
            !type
              ? `/${category?.toLowerCase()}/${slug}${_id}.html`
              : '/wishtrack'
          }
        >
          {title}
        </Link>
      </div>
      <div className={style.playlist__artist}>
        {description}
      </div>
    </div>
  )
}

export default CardPlaylist
