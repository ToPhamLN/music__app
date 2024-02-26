import React from 'react'
import { IoHeadset, IoHeartOutline } from 'react-icons/io5'
import {
  MdAudiotrack,
  MdFormatListBulletedAdd,
  MdOutlineAdd,
  MdOutlinePlaylistAdd,
  MdPeopleAlt
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import style from '~/styles/MoreList.module.css'
import MoreListCreatePlayList from './MoreListCreatePlayList'
import { FaShare } from 'react-icons/fa'

interface Props {
  refItem: React.RefObject<HTMLDivElement>
  location: { top: number; left: number }
}
const MoreList = (props: Props) => {
  const { location, refItem } = props

  return (
    <div
      className={style.more__option}
      ref={refItem}
      style={{
        top: location.top,
        left: location.left
      }}
    >
      <div className={style.header}>
        <div className={style.image__option}>
          <img
            src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
            alt='Poster List'
          />
        </div>
        <div className={style.track__info__option}>
          <Link
            to={'/'}
            className={style.track__name__option}
          >
            name tra ckss sss sss ss sssss ssdddddd ewq
          </Link>
          <div className={style.popularity}>
            <div className={style.item__popularity}>
              <IoHeartOutline />
              <span>1000.000</span>
            </div>
            <div className={style.item__popularity}>
              <IoHeadset />
              <span>1000.000</span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.choose__option}>
        <button className={style.btn}>
          <MdOutlineAdd className={style.icon} />
          Thêm vào playlist
          <MoreListCreatePlayList />
        </button>
        <button className={style.btn}>
          <IoHeartOutline className={style.icon} />
          Thêm vào/Xóa khỏi Bài hát ưa thích
        </button>
        <button className={style.btn}>
          <MdOutlinePlaylistAdd className={style.icon} />
          Xóa khỏi danh sách này
        </button>
        <button className={style.btn}>
          <MdFormatListBulletedAdd className={style.icon} />
          Thêm vào danh sách chờ
        </button>
        <button className={style.btn}>
          <MdPeopleAlt className={style.icon} />
          Chuyển đến nghệ sĩ
          <div className={style.artist__list}></div>
        </button>
        <button className={style.btn}>
          <MdAudiotrack className={style.icon} />
          Chuyển đến album
        </button>
        <button className={style.btn}>
          <FaShare className={style.icon} />
          Chia sẻ
        </button>
      </div>
    </div>
  )
}

export default MoreList
