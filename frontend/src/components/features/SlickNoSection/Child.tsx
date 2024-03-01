import { Link } from 'react-router-dom'
import style from '~/styles/Home.module.css'
import { motion } from 'framer-motion'
import { TrackAnimation } from '~/components/common'
import { FaPlay } from 'react-icons/fa'

const Child = () => {
  return (
    <motion.div className={style.child}>
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
    </motion.div>
  )
}
export default Child
