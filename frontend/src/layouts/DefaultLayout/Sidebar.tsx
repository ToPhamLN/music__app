import React from 'react'
import style from '~/styles/Sidebar.module.css'
import { useAppSelector } from '~/hooks'
import { GrHomeRounded } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import {
  MdOutlineAdd,
  MdOutlineCategory,
  MdOutlineBookmarkBorder,
  MdOutlineEmojiEvents
} from 'react-icons/md'
import { ItemListBar } from '~/components/features'
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
        <Link to={'/rank'} className={style.link}>
          <MdOutlineEmojiEvents className={style.icon} />
          <span className={style.link__name}>Xếp hạng</span>
          <div className={style.hover__content}>
            Xếp hạng
          </div>
        </Link>
        <Link to={'/topic'} className={style.link}>
          <MdOutlineCategory className={style.icon} />
          <span className={style.link__name}>Chủ đề</span>
          <div className={style.hover__content}>Chủ đề</div>
        </Link>
        <div
          style={{
            height: '2px',
            width: '100%',
            background: 'var(--text)'
          }}
        ></div>
        <Link to={'/mylist'} className={style.link}>
          <MdOutlineBookmarkBorder />
          <span className={style.link__name}>Thư viện</span>
          <div className={style.hover__content}>
            Thư viện
          </div>
        </Link>
      </div>
      <div className={style.my__list}>
        <ItemListBar />
        <ItemListBar />
        <ItemListBar />
        <ItemListBar />
        <ItemListBar />
        <ItemListBar />
        <ItemListBar />
        <ItemListBar />
      </div>

      <div className={style.menu}>
        <div className={style.link}>
          <MdOutlineAdd className={style.icon} />
          <span className={style.link__name}>
            Thêm playlist mới
          </span>
          <div className={style.hover__content}>
            Thêm playlist mới
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
