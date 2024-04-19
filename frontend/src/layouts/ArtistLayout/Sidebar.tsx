import React from 'react'
import style from '~/styles/Sidebar.module.css'
import { useAppSelector } from '~/hooks'
import { GrHomeRounded } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import {
  MdDiscount,
  MdMusicNote,
  MdOutlineLibraryAdd,
  MdOutlineLibraryMusic
} from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
const Sidebar: React.FC = () => {
  const { isSidebar } = useAppSelector(
    (state) => state.global
  )
  return (
    <div
      className={`${style.sidebar} ${isSidebar && style.show}`}
    >
      <div className={style.menu}>
        <Link to={'/'} className={style.link}>
          <GrHomeRounded className={style.icon} />
          <span className={style.link__name}>
            Trang chủ
          </span>
          <div className={style.hover__content}>
            Trang chủ
          </div>
        </Link>
        <Link to={'/mytrack'} className={style.link}>
          <MdMusicNote className={style.icon} />
          <span className={style.link__name}>Bài Hát</span>
          <div className={style.hover__content}>
            Bài Hát
          </div>
        </Link>
        <Link to={'/track/create'} className={style.link}>
          <IoMdAdd className={style.icon} />
          <span className={style.link__name}>
            Thêm Bài Hát
          </span>
          <div className={style.hover__content}>
            Thêm Bài Hát
          </div>
        </Link>
        <Link to={'/myalbum'} className={style.link}>
          <MdOutlineLibraryMusic className={style.icon} />
          <span className={style.link__name}>Album</span>
          <div className={style.hover__content}>Album</div>
        </Link>
        <Link to={'/album/create'} className={style.link}>
          <MdOutlineLibraryAdd className={style.icon} />
          <span className={style.link__name}>
            Tạo Album Mới
          </span>
          <div className={style.hover__content}>
            Tạo Album Mới
          </div>
        </Link>
        <Link to={'/mybio'} className={style.link}>
          <MdDiscount className={style.icon} />
          <span className={style.link__name}>Tiểu sử</span>
          <div className={style.hover__content}>
            Tiểu sử
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
