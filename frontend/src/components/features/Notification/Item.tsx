import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import style from '~/styles/Notification.module.css'
interface Props {
  removingItem: any
}
const Item = ({ removingItem }: Props) => {
  return (
    <div className={`${style.notification__card} `}>
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

export default Item
