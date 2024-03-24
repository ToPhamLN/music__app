import React from 'react'
import { IoHeadset, IoHeartOutline } from 'react-icons/io5'
import {
  MdAudiotrack,
  MdDelete,
  MdFormatListBulletedAdd,
  MdOutlineAccountCircle,
  MdOutlineAdd,
  MdOutlinePlaylistAdd,
  MdPeopleAlt
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import style from '~/styles/MoreList.module.css'
import { FaPen, FaShare } from 'react-icons/fa'

interface Props {
  refItem: React.RefObject<HTMLDivElement>
  location: { top: number; left: number }
}
const MoreListHeader = (props: Props) => {
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
          <FaPen className={style.icon} />
          Sửa đổi danh sách này
        </button>
        <button className={style.btn}>
          <MdDelete className={style.icon} />
          Xóa danh sách này
        </button>
        <button className={style.btn}>
          <IoHeartOutline className={style.icon} />
          Thêm vào thư viện
        </button>
        <button className={style.btn}>
          <MdOutlineAccountCircle className={style.icon} />
          Hiện trên hồ sơ
        </button>
        <button
          className={style.btn}
          onClick={() =>
            navigator.clipboard.writeText(
              window.location.href
            )
          }
        >
          <FaShare className={style.icon} />
          Chia sẻ
        </button>
      </div>
    </div>
  )
}

export default MoreListHeader
