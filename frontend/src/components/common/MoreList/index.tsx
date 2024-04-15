import React, { useEffect, useState } from 'react'
import { IoHeadset, IoHeartOutline } from 'react-icons/io5'
import {
  MdAudiotrack,
  MdDelete,
  MdFormatListBulletedAdd,
  MdOutlineAdd,
  MdOutlinePlaylistAdd,
  MdPeopleAlt
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import style from '~/styles/MoreList.module.css'
import MoreListCreatePlayList from './MoreListCreatePlayList'
import { FaShare } from 'react-icons/fa'
import { useAppSelector } from '~/hooks'
import { RiPencilFill } from 'react-icons/ri'
import { ERole } from '~/constants/enum'
import { DTrack } from '~/types/data'

interface Props {
  refItem: React.RefObject<HTMLDivElement>
  location: { top: number; left: number }
  track: DTrack
}
const MoreList = ({ location, refItem, track }: Props) => {
  const { role, idRole } = useAppSelector(
    (state) => state.profile
  )
  const [popUp, setPopUp] = useState<{
    top: number
    left: number
  }>({
    top: 0,
    left: 0
  })

  useEffect(() => {
    const { width, height } =
      refItem.current?.getBoundingClientRect() as DOMRect
    let newTop = location.top
    if (newTop + height > innerHeight)
      newTop = innerHeight - height - 10
    let newLeft = location.left
    if (newLeft + width > innerWidth)
      newLeft = innerWidth - width - 10
    setPopUp({
      top: newTop,
      left: newLeft
    })
  }, [location])

  return (
    <div
      className={style.more__option}
      ref={refItem}
      style={{
        top: popUp.top,
        left: popUp.left
      }}
    >
      <div className={style.header}>
        <div className={style.image__option}>
          <img
            src={track?.photo?.path}
            alt={track?.photo?.fileName}
          />
        </div>
        <div className={style.track__info__option}>
          <Link
            to={`/track/${track?.slug}${track?._id}.html`}
            className={style.track__name__option}
          >
            {track?.title}
          </Link>
          <div className={style.popularity}>
            <div className={style.item__popularity}>
              <IoHeartOutline />
              <div>{track?.likes?.length?.toString()}</div>
            </div>
            <div className={style.item__popularity}>
              <IoHeadset />
              <div>{track?.listens?.toString()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.choose__option}>
        {role === ERole.ARTIST &&
          track?.author == idRole?._id && (
            <>
              <Link
                to={`/track/${track?.slug}${track?._id}.html/edit`}
              >
                <button className={style.btn}>
                  <RiPencilFill className={style.icon} />
                  Sửa đổi bài hát này
                </button>
              </Link>
              <button className={style.btn}>
                <MdDelete className={style.icon} />
                Xóa khỏi danh sách này
              </button>
            </>
          )}
        <button
          className={style.btn}
          onClick={() =>
            navigator.clipboard.writeText(
              `${window.location.host}/track/${track?.slug}${track?._id}.html`
            )
          }
        >
          <FaShare className={style.icon} />
          Chia sẻ
        </button>
      </div>
      {/* <div className={style.choose__option}>
        <button className={style.btn}>
          <MdOutlineAdd className={style.icon} />
          Thêm vào playlist
          <MoreListCreatePlayList />
        </button>
        <button className={style.btn}>
          <IoHeartOutline className={style.icon} />
          Thêm vào/Xóa khỏi Bài hát ưa thích
        </button>
        <button className={style.btn}>
          <MdOutlinePlaylistAdd className={style.icon} />
          Xóa khỏi danh sách này
        </button>
        <button className={style.btn}>
          <MdFormatListBulletedAdd className={style.icon} />
          Thêm vào danh sách chờ
        </button>
        <button className={style.btn}>
          <MdPeopleAlt className={style.icon} />
          Chuyển đến nghệ sĩ
          <div className={style.artist__list}></div>
        </button>
        <button className={style.btn}>
          <MdAudiotrack className={style.icon} />
          Chuyển đến album
        </button>
        <button className={style.btn}>
          <FaShare className={style.icon} />
          Chia sẻ
        </button>
      </div> */}
    </div>
  )
}

export default MoreList
