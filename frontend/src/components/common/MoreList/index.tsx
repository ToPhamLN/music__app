import React, { useEffect, useState } from 'react'
import {
  IoHeadset,
  IoHeartOutline,
  IoHeart
} from 'react-icons/io5'
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
import { useAppSelector, useAxiosPrivate } from '~/hooks'
import { RiPencilFill } from 'react-icons/ri'
import { ERole } from '~/constants/enum'
import { DInteraction, DTrack } from '~/types/data'
import { mutate } from 'swr'

interface Props {
  refItem: React.RefObject<HTMLDivElement>
  location: { top: number; left: number }
  track: DTrack
  interaction: DInteraction
  handleLikeTrack: () => Promise<void>
  likedTrack: boolean
}
const MoreList = ({
  location,
  refItem,
  track,
  interaction,
  handleLikeTrack,
  likedTrack
}: Props) => {
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
  const axios = useAxiosPrivate()

  const handleDeleteTrack = () => {
    console.log('delete track')
  }

  const handleRemoveTrack = () => {
    console.log('remove track')
  }

  const handleAddWaittingList = () => {
    console.log('add waitting list')
  }

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
          track?.author?._id == idRole?._id && (
            <>
              <Link
                to={`/track/${track?.slug}${track?._id}.html/edit`}
              >
                <button className={style.btn}>
                  <RiPencilFill className={style.icon} />
                  Sửa đổi bài hát này
                </button>
              </Link>
              <button
                className={style.btn}
                onClick={handleDeleteTrack}
              >
                <MdDelete className={style.icon} />
                Xóa khỏi danh sách này
              </button>
            </>
          )}
        {role === ERole.USER &&
          track?.author?._id == idRole?._id && (
            <button
              className={style.btn}
              onClick={handleRemoveTrack}
            >
              <MdOutlinePlaylistAdd
                className={style.icon}
              />
              Xóa khỏi danh sách này
            </button>
          )}
        {role === ERole.USER && (
          <>
            <button
              className={style.btn}
              onClick={handleLikeTrack}
            >
              {likedTrack ? (
                <>
                  <IoHeart className={style.icon} />
                  Xóa khỏi Bài hát ưa thích
                </>
              ) : (
                <>
                  <IoHeartOutline className={style.icon} />
                  Thêm vào Bài hát ưa thích
                </>
              )}
            </button>
            <div className={style.btn} role='button'>
              <MdOutlineAdd className={style.icon} />
              Thêm vào playlist
              <MoreListCreatePlayList />
            </div>
          </>
        )}
        {role !== ERole.ARTIST && (
          <button
            className={style.btn}
            onClick={handleAddWaittingList}
          >
            <MdFormatListBulletedAdd
              className={style.icon}
            />
            Thêm vào danh sách chờ
          </button>
        )}

        <button className={style.btn}>
          <MdPeopleAlt className={style.icon} />
          Chuyển đến nghệ sĩ
          <div className={style.artist__list}>
            <div className={style.mylist}>
              <Link
                to={`/artist/${track?.author?.slug}${track?.author?._id}.html`}
                className={style.add__new}
              >
                <span>{track?.author?.username}</span>
              </Link>
              {track?.artist?.map((artist, index) => (
                <Link
                  key={index}
                  to={`/artist/${artist?.slug}${artist?._id}.html`}
                  className={style.add__new}
                >
                  <span>{artist?.username}</span>
                </Link>
              ))}
            </div>
          </div>
        </button>
        <Link
          to={`/album/${track?.album?._id}.html`}
          className={style.btn}
        >
          <MdAudiotrack className={style.icon} />
          Chuyển đến album
        </Link>
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
    </div>
  )
}

export default MoreList
