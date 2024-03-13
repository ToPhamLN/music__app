import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import style from '~/styles/Navbar.module.css'

const ItemNotify = () => {
  return (
    <div className={`${style.notify__item} `}>
      <div className={style.type}></div>
      <div className={style.info}>
        <div className={style.title}>
          notification title title title title notification,
          titlele
        </div>
        <div className={style.description}>
          notification title title title title notification,
          titlele notification title title title title
          notification, titlele notification title title
        </div>
      </div>
      <button className={style.icon}>
        <MdOutlineClose />
      </button>
    </div>
  )
}

export default ItemNotify
