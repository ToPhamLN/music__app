import React from 'react'
import { MdOutlineAccessTime } from 'react-icons/md'
import style from '~/styles/PlayListDetails.module.css'
import { ItemPlayList } from '~/components/features'

const index = () => {
  return (
    <div className={style.playlist__songs}>
      <div className={style.column__name}>
        <div className={style.column__index}>#</div>
        <div className={style.column__title}>Tiêu đề</div>
        <div className={style.column__album}>Album</div>
        <div className={style.column__day}>
          Ngày cập nhập
        </div>
        <div className={style.column__like}></div>

        <div className={style.column__duration}>
          <MdOutlineAccessTime />
        </div>
      </div>
      {Array.from({ length: 5 }, (_, i) => (
        <ItemPlayList key={i} />
      ))}
    </div>
  )
}

export default index
