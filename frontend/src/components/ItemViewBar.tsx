import React, { useState, useRef, useEffect } from 'react'
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

const ItemViewBar: React.FC = () => {
  const [validSearch, setValidSearch] = useState<string>()
  const [isMoreVisible, setIsMoreVisible] =
    useState<boolean>(false)
  const moreOptionRef = useRef<HTMLDivElement>(null)
  const moreOptionBtnRef = useRef<HTMLButtonElement>(null)

  const OpenMoreHandler = () => {
    setIsMoreVisible((prev) => !prev)
  }

  const CloseOptionHandler = (event: MouseEvent) => {
    if (
      moreOptionBtnRef.current &&
      moreOptionBtnRef.current.contains(event.target as Node)
    ) {
      return
    }

    if (
      moreOptionRef.current &&
      !moreOptionRef.current.contains(event.target as Node)
    ) {
      setIsMoreVisible(false)
      setValidSearch('')
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', CloseOptionHandler)

    return () => {
      document.removeEventListener(
        'mousedown',
        CloseOptionHandler
      )
    }
  }, [])

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
            ref={moreOptionBtnRef}
            className={style.btn}
          >
            <LuMoreHorizontal />
          </button>
        </div>
      </div>
      {isMoreVisible && (
        <div className={style.more__option} ref={moreOptionRef}>
          <div className={style.header}>
            <div className={style.image__option}>
              <img
                src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
                alt='Poster List'
              />
            </div>
            <div className={style.track__info__option}>
              <Link
                to={'/'}
                className={style.track__name__option}
              >
                name tra ckss sss sss ss sssss ssdddddd ewq
              </Link>
              <div className={style.popularity}>
                <div className={style.item__popularity}>
                  <IoHeartOutline />
                  <span>1000.000</span>
                </div>
                <div className={style.item__popularity}>
                  <IoHeadset />
                  <span>1000.000</span>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: '1rem',
              height: '2px',
              width: '100%',
              background: 'var(--text)'
            }}
          ></div>
          <div className={style.choose__option}>
            <button className={style.btn}>
              <MdOutlineAdd className={style.icon} />
              Thêm vào playlist
              <div className={style.add__playlist}>
                <div className={style.searchlist}>
                  <button className={style.icon}>
                    <FaSearch />
                  </button>
                  <input
                    type='text'
                    name='search'
                    placeholder='Tìm kiếm _ _ _'
                    autoComplete='off'
                    value={validSearch}
                    onChange={(e) =>
                      setValidSearch(e.target.value)
                    }
                  />
                  {validSearch && (
                    <button
                      className={style.icon}
                      onClick={() => setValidSearch('')}
                    >
                      <MdOutlineClose />
                    </button>
                  )}
                </div>
                <button className={style.add__new}>
                  <MdOutlineAdd className={style.icon} />
                  Tạo danh sách mới
                </button>
                <div className={style.my__list}>
                  <button className={style.add__new}>
                    <span>
                      asdfa sdafwe dsfwe fwewqeeeeeeqwrwq
                    </span>
                  </button>
                </div>
              </div>
            </button>
            <button className={style.btn}>
              <IoHeartOutline className={style.icon} />
              Thêm vào/Xóa khỏi Bài hát ưa thích
            </button>
            <button className={style.btn}>
              <MdOutlinePlaylistAdd className={style.icon} />
              Thêm vào / Xóa khỏi danh sách phát
            </button>
            <button className={style.btn}>
              <MdPeopleAlt className={style.icon} />
              Chuyển đến album
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemViewBar
