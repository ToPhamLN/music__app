import React from 'react'
import style from '~/styles/PlayList.module.css'

const PlayList: React.FC = () => {
  return (
    <div className={style.playlist}>
      <div className={style.header__playlist}>
        <div className={style.img__playlist}>
          <img
            src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
            alt='Poster List'
          />
          <div className={style.showingup}></div>
        </div>
        <div className={style.info__playlist}>
          <h6>dd ddd ddddd dddd dd dddd</h6>
          <span> Cập nhập : 10/3/2034</span>
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
        </div>
      </div>
      <div className={style.list}></div>
    </div>
  )
}

export default PlayList
