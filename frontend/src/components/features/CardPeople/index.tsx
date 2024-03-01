import { Link } from 'react-router-dom'
import style from '~/styles/Card.module.css'

const CardPeople = () => {
  return (
    <div className={style.card__people}>
      <div className={style.title}>
        <div className={style.image}>
          <img
            src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
            alt='Image Playlist'
          />
        </div>
      </div>
      <div className={style.artist__name}>
        <Link to={'/playlist'}>
          playlist name ttt tt tt
        </Link>
      </div>
    </div>
  )
}

export default CardPeople
