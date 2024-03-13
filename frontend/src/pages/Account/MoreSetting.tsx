import React from 'react'
import { IoMdMoon } from 'react-icons/io'
import { Toggle } from '~/components/common'
import style from '~/styles/Account.module.css'

const MoreSetting = () => {
  return (
    <div className={style.content}>
      <div className={style.toggle__item}>
        <div className={style.toggle__name}>
          <IoMdMoon />
          Chế độ tối
        </div>
        <Toggle />
      </div>
    </div>
  )
}

export default MoreSetting
