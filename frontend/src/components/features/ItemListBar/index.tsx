import React from 'react'
import { useHover } from '~/hooks'
import style from '~/styles/Sidebar.module.css'

const ItemListBar: React.FC = () => {
  const {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    hoverPosition
  } = useHover()
  return (
    <div
      className={style.item__list}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={style.icon}>
        <img
          src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
          alt='Poster List'
        />
      </div>
      <span className={style.name__item}>playlis</span>
      <div className={style.hover__content}>
        playlist name vertical eeeeeee eee
      </div>
      {isHovered && (
        <div
          className={style.item__hover__content}
          style={{
            top: hoverPosition.top,
            left: hoverPosition.left
          }}
        >
          playlist name vertical eeeeeee eee
        </div>
      )}
    </div>
  )
}

export default ItemListBar
