// import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
// import { TrackAnimation } from '~/components/common'
// import { ERole } from '~/constants/enum'
// import { useAppSelector } from '~/hooks'
import style from '~/styles/Card.module.css'
import { DListTrack } from '~/types/data'
interface Props {
  listTrack: DListTrack
  type?: string
}
const CardPlaylist = ({ listTrack, type }: Props) => {
  const { photo, title, category, slug, _id, description } =
    listTrack
  // const [searchParams, setSearchParams] = useSearchParams()
  // const q = searchParams.get('q') ?? ''
  // console.log(q)

  return (
    <div className={`${style.card__playlist} `}>
      <div className={style.title}>
        <div className={style.image}>
          <img
            src={
              photo?.path
                ? photo?.path
                : '/src/assets/disc.png'
            }
            alt='Image Playlist'
          />
        </div>
        {/* {role === ERole.USER && (
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
        )} */}
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
