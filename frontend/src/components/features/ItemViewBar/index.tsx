import React, { useState, useRef, MouseEvent } from 'react'
import style from '~/styles/Viewbar.module.css'
import { Link } from 'react-router-dom'
import {
  IoHeartOutline,
  IoHeartSharp,
  IoHeadset
} from 'react-icons/io5'
import { LuMoreHorizontal } from 'react-icons/lu'
import {
  MdOutlineAdd,
  MdOutlinePlaylistRemove,
  MdOutlinePlaylistAdd,
  MdPeopleAlt,
  MdOutlineClose
} from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { useClickOutside } from '~/hooks'
import { MoreList } from '~/components/common'
const ItemViewBar: React.FC = () => {
  const [isMoreVisible, setIsMoreVisible] =
    useState<boolean>(false)
  const moreOptionRef = useRef<HTMLDivElement>(null)
  const [location, setLocation] = useState<{
    top: number
    left: number
  }>({
    top: 0,
    left: 0
  })

  const toggleMoreVisible = () => {
    setIsMoreVisible((prev) => !prev)
  }
  const CloseOptionHandler = () => {
    toggleMoreVisible()
  }
  const OpenMoreHandler = (
    event: MouseEvent<HTMLElement>
  ) => {
    const { innerHeight } = window
    const { top, left } =
      event.currentTarget.getBoundingClientRect()
    let newTop = innerHeight - 450
    if (window.scrollY + top < innerHeight - 450) {
      newTop = window.scrollY + top
    }
    setLocation({
      top: newTop,
      left: window.scrollX + left
    })
    toggleMoreVisible()
  }

  useClickOutside(moreOptionRef, CloseOptionHandler)

  return (
    <div className={`${style.item__view} `}>
      <div className={style.image}>
        <img
          src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
          alt='Poster List'
        />
      </div>
      <div className={`${style.track__info}`}>
        <Link to={'/'} className={style.track__name}>
          track name track name track name
        </Link>
        <div className={style.artist}>
          <Link to={'/'}>artist 1</Link>
          <Link to={'/'}>artist 2</Link>
          <Link to={'/'}>artist 2</Link>
          <Link to={'/'}>artist 2</Link>
        </div>
      </div>
      <div className={style.control}>
        <div className={style.wrapper__control}>
          <button className={style.btn}>
            <IoHeartOutline />
          </button>
          <button
            onClick={OpenMoreHandler}
            className={style.btn}
          >
            <LuMoreHorizontal />
          </button>
        </div>
      </div>
      {isMoreVisible && (
        <MoreList
          refItem={moreOptionRef}
          location={location}
        />
      )}
    </div>
  )
}

export default ItemViewBar
