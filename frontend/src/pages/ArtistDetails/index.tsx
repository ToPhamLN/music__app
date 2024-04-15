import React, { useRef } from 'react'
import { FaPlay } from 'react-icons/fa'
import { MdAdd } from 'react-icons/md'
import {
  Playlist,
  SlickPlaylist
} from '~/components/features'
import SlickPeople from '~/components/features/SlickPeple'
import style from '~/styles/ArtistDetails.module.css'

const ArtistDetails = () => {
  const menuRef = {
    pin: useRef<HTMLDivElement>(null),
    popular: useRef<HTMLDivElement>(null),
    collection: useRef<HTMLDivElement>(null),
    bio: useRef<HTMLDivElement>(null)
  }
  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement>
  ) => {
    if (ref.current)
      ref?.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className={style.artist__details}>
      <div className={style.background}>
        <div className={style.image}>
          <img
            src='https://raw.githubusercontent.com/ToPhamLN/diciiart-dev/dev/assets/imgs/bgdavatar.jpg'
            alt=''
          />
        </div>
        <div className={style.artist__info}>
          <div className={style.artist__avatar}>
            <img
              src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
              alt=''
            />
          </div>
          <div className={style.right}>
            <h1 className={style.artist__name}> vũ</h1>
            <div className={style.statistical}>
              <span> 28K Lượt nghe</span>
              <span> 27K Lượt thích</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.header} '' `}>
        <div className={style.menu}>
          <button
            onClick={() => scrollToSection(menuRef.pin)}
          >
            Nổi bật
          </button>
          <button
            onClick={() => scrollToSection(menuRef.popular)}
          >
            Phổ biến
          </button>
          <button
            onClick={() =>
              scrollToSection(menuRef.collection)
            }
          >
            Bộ sưu tập
          </button>
          <button
            onClick={() => scrollToSection(menuRef.bio)}
          >
            Tiểu sử
          </button>
        </div>
        <div className={style.handler}>
          <button className={style.btn}>
            <MdAdd className={style.icon} />
            Theo dõi
          </button>
        </div>
      </div>
      <div className={style.map} ref={menuRef.pin}>
        <SlickPlaylist />
      </div>
      <div
        className={style.popular__songs}
        ref={menuRef.popular}
      >
        <h1>Phổ biến</h1>
        <button className={style.play__playlist}>
          <FaPlay />
        </button>
        {/* <Playlist /> */}
        <button className={style.more__watch}>
          Xem thêm / Ẩn bớt
        </button>
      </div>
      <div className={style.map} ref={menuRef.collection}>
        <SlickPlaylist />
      </div>

      <div className={style.artist__bio} ref={menuRef.bio}>
        <h1>Tiểu sử</h1>
        <article className={style.container}></article>
      </div>
    </div>
  )
}
export default ArtistDetails
