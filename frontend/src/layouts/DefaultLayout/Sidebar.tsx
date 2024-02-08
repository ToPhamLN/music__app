import React from 'react'
import style from '~/styles/Sidebar.module.css'
import { useAppSelector } from '~/hooks/redux'
import { GrHomeRounded } from 'react-icons/gr'
import { FaRankingStar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { MdPlaylistPlay, MdOutlineAdd } from 'react-icons/md'
import ItemListBar from '~/components/ItemListBar'
const Sidebar: React.FC = () => {
  const { track } = useAppSelector((state) => state.trackPlay)
  return (
    <div
      className={`${style.sidebar} ${!track && style.no__track}`}
    >
      <div className={style.menu}>
        <Link to={'/'} className={style.link}>
          <GrHomeRounded className={style.icon} />
          <span className={style.link__name}>
            Trang chủ
          </span>{' '}
        </Link>
        <Link to={'/rank'} className={style.link}>
          <FaRankingStar className={style.icon} />
          <span className={style.link__name}>Bảng xếp hạng</span>
        </Link>
      </div>
      <div
        style={{
          height: '2px',
          width: '100%',
          background: 'var(--text)'
        }}
      ></div>
      <div className={style.list}>
        <Link to={'/mylist'} className={style.link}>
          <MdPlaylistPlay />
          <span className={style.link__name}>Thư viện</span>
        </Link>
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
        <div className={style.link}>
          <MdOutlineAdd className={style.icon} />
          <span className={style.link__name}>
            Thêm playlist mới
          </span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
