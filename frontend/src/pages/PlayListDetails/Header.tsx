import React, { useState } from 'react'
import { FaPen, FaPlay, FaShare } from 'react-icons/fa'
import { IoHeartOutline } from 'react-icons/io5'
import { LuMoreHorizontal } from 'react-icons/lu'
import { MdDelete } from 'react-icons/md'
import {
  Deletion,
  TrackAnimation
} from '~/components/common'
import { RenamePlaylist } from '~/components/features'
import style from '~/styles/PlayListDetails.module.css'

const Header = () => {
  const [renameCard, setRenameCard] =
    useState<boolean>(false)
  const [deleteCard, setDeleteCard] =
    useState<boolean>(false)
  return (
    <div>
      <div className={style.header__playlist}>
        <div className={style.header__title}>
          <div className={style.img__playlist}>
            <img
              src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
              alt='Poster List'
            />
            <div className={style.header__animation}>
              <TrackAnimation />
            </div>
            <div className={style.hover__play}>
              <button>
                <FaPlay />
              </button>
            </div>
          </div>
          <button className={style.header__btn}>
            <IoHeartOutline />
          </button>
        </div>
        <div className={style.playlist__control}>
          <button className={style.header__btn}>
            <LuMoreHorizontal />
            <div className={style.header__more__card}>
              <button
                className={style.rename__playlist}
                onClick={() => setRenameCard((p) => !p)}
              >
                <FaPen className={style.icon} />
                Đổi tên danh sách nhạc
              </button>
              <button
                className={style.delete__playlist}
                onClick={() => setDeleteCard((p) => !p)}
              >
                <MdDelete className={style.icon} />
                Xóa danh sách nhạc
              </button>
              <button>
                <FaShare className={style.icon} />
                Chia sẻ
              </button>
            </div>
          </button>
        </div>
        <div className={style.info__playlist}>
          <h1>
            dd ddd ddddd dddd dd dd ddd ddddd dddd dd dd
          </h1>
        </div>
      </div>
      <div className={style.info__playlist}>
        <div className={style.more__info}>
          <div className={style.info__user}>
            <div className={style.img__user}>
              <img
                src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
                alt='Poster List'
              />
            </div>
            <span className={style.user__name}>eeee</span>
          </div>
        </div>
        <div className={style.statistics}>
          <span>5,131,321 likes · </span>
          <span>100 songs, </span>
          <span>6 hr 57 min </span>
        </div>
      </div>
      {renameCard && (
        <RenamePlaylist setExit={setRenameCard} />
      )}
      {deleteCard && <Deletion setExit={setDeleteCard} />}
    </div>
  )
}

export default Header
