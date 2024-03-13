import React from 'react'
import { FaPen, FaShare } from 'react-icons/fa'
import { LuMoreHorizontal } from 'react-icons/lu'
import { MdDelete } from 'react-icons/md'
import style from '~/styles/UserDetails.module.css'
import style2 from '~/styles/Card.module.css'
import {
  Playlist,
  SlickPlaylist,
  SlickPeople
} from '~/components/features'

const UserDetails = () => {
  return (
    <div className={style.user__details}>
      <div className={style.background}>
        <div className={style.image}>
          <img
            src='https://raw.githubusercontent.com/ToPhamLN/diciiart-dev/dev/assets/imgs/bgdavatar.jpg'
            alt=''
          />
        </div>
        <div className={style.user__info}>
          <div className={style.user__avatar}>
            <img
              src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
              alt=''
            />
          </div>
          <div className={style.right}>
            <h1 className={style.user__name}> vũ</h1>
            <div className={style.statistical}>
              3 Danh sách công khai
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.header} '' `}>
        <button className={style.header__btn}>
          <LuMoreHorizontal />
          <div className={style.header__more__card}>
            <button className={style.rename__playlist}>
              <FaPen className={style.icon} />
              Đổi tên danh sách nhạc
            </button>
            <button>
              <FaShare className={style.icon} />
              Chia sẻ
            </button>
          </div>
        </button>
      </div>
      <SlickPeople />
      <div className={style.map}>
        <h1>Nghe gần đây</h1>
        <Playlist />
      </div>
      <SlickPlaylist />
    </div>
  )
}

export default UserDetails
