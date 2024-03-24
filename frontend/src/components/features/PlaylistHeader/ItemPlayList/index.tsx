import React, { useState, useRef, MouseEvent } from 'react'
import { IoHeartOutline } from 'react-icons/io5'
import { LuMoreHorizontal } from 'react-icons/lu'
import { FaPlay } from 'react-icons/fa'
import style from '~/styles/PlayListDetails.module.css'
import { Link } from 'react-router-dom'
import { useHover, useClickOutside } from '~/hooks'
import TrackAnimation from '../../../common/TrackAnimation'
import { MoreList } from '~/components/common'

const ItemPlayList: React.FC = () => {
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
  // show option block
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

  // hover name, album,artist while fixed
  const {
    isHovered: isNameHovered,
    hoverPosition: nameHoverPosition,
    handleMouseEnter: handleNameMouseEnter,
    handleMouseLeave: handleNameMouseLeave
  } = useHover()

  const {
    isHovered: isArtistHovered,
    hoverPosition: artistHoverPosition,
    handleMouseEnter: handleArtistMouseEnter,
    handleMouseLeave: handleArtistMouseLeave
  } = useHover()

  const {
    isHovered: isAlbumHovered,
    hoverPosition: albumHoverPosition,
    handleMouseEnter: handleAlbumMouseEnter,
    handleMouseLeave: handleAlbumMouseLeave
  } = useHover()

  return (
    <div className={style.song__item}>
      <div className={style.song__index}>1</div>
      <div className={style.song__title}>
        <div className={style.song__image}>
          <img
            src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
            alt='song Poster'
          />
          <div className={style.song__animation}>
            <TrackAnimation />
          </div>
          <div className={style.song__play}>
            <button>
              <FaPlay />
            </button>
          </div>
        </div>
        <div className={style.song__name__album}>
          <div
            className={style.song__name}
            onMouseEnter={handleNameMouseEnter}
            onMouseLeave={handleNameMouseLeave}
          >
            <Link>
              Young as the Morning old as the Sea sea sea
              sea se
            </Link>
            {isNameHovered && (
              <div
                className={style.hover__content}
                style={{
                  position: 'fixed',
                  top: nameHoverPosition.top,
                  left: nameHoverPosition.left
                }}
              >
                Your hover content for name
              </div>
            )}
          </div>
          <div
            className={style.song__artist}
            onMouseEnter={handleArtistMouseEnter}
            onMouseLeave={handleArtistMouseLeave}
          >
            <Link>Passenger</Link>
            <Link>Passenger</Link>
            <Link>Passenger</Link>
            <Link>Passenger</Link>

            {isArtistHovered && (
              <div
                className={style.hover__content}
                style={{
                  position: 'fixed',
                  top: artistHoverPosition.top,
                  left: artistHoverPosition.left
                }}
              >
                Your hover content for artist
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={style.song__album}
        onMouseEnter={handleAlbumMouseEnter}
        onMouseLeave={handleAlbumMouseLeave}
      >
        <Link>Young as the Morning old as the Sea</Link>
        {isAlbumHovered && (
          <div
            className={style.hover__content}
            style={{
              position: 'fixed',
              top: albumHoverPosition.top,
              left: albumHoverPosition.left
            }}
          >
            Your hover content for album
          </div>
        )}
      </div>
      <div className={style.song__day}>May 31, 2022</div>
      <div className={style.song__like}>
        <button className={style.btn}>
          <IoHeartOutline />
        </button>
      </div>
      <div className={style.song__control}>
        <span className={style.duration}>3:26</span>
        <button
          className={style.btn}
          onClick={OpenMoreHandler}
        >
          <LuMoreHorizontal />
        </button>
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

export default ItemPlayList
