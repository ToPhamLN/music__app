import React, { useEffect, useState } from 'react'
import { IoHeadset, IoHeartOutline } from 'react-icons/io5'
import {
  MdAudiotrack,
  MdDelete,
  MdFormatListBulletedAdd,
  MdOutlineAccountCircle,
  MdOutlineAdd,
  MdOutlinePlaylistAdd,
  MdPeopleAlt
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import style from '~/styles/MoreList.module.css'
import { FaPen, FaShare } from 'react-icons/fa'
import { DListTrack } from '~/types/data'
import { useAppSelector } from '~/hooks'
import { ERole } from '~/constants/enum'

interface Props {
  refItem: React.RefObject<HTMLDivElement>
  location: { top: number; left: number }
  listTrack: DListTrack
}
const MoreListHeader = ({
  location,
  refItem,
  listTrack
}: Props) => {
  const { idRole, role } = useAppSelector(
    (state) => state?.profile
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
  }, [])
  return (
    <div
      className={`${style.more__option} ${style.header}`}
      ref={refItem}
      style={{
        top: popUp.top,
        left: popUp.left
      }}
    >
      <>
        <div className={style.header}>
          <div className={style.image__option}>
            <img
              src={listTrack?.photo?.path}
              alt={listTrack?.photo?.fileName}
            />
          </div>
          <div className={style.track__info__option}>
            <Link
              to={''}
              className={style.track__name__option}
            >
              {listTrack?.title}
            </Link>
            <div className={style.popularity}>
              <div className={style.item__popularity}>
                <IoHeartOutline />
                <span>
                  {listTrack?.likes?.length?.toString()}
                </span>
              </div>
              <div className={style.item__popularity}>
                <IoHeadset />
                <span>
                  {listTrack?.listens?.toString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.choose__option}>
          {idRole?._id == listTrack?.author?._id && (
            <>
              <Link to={'edit'}>
                <button className={style.btn}>
                  <FaPen className={style.icon} />
                  Sửa đổi danh sách này
                </button>
              </Link>
              <button className={style.btn}>
                <MdDelete className={style.icon} />
                Xóa danh sách này
              </button>
            </>
          )}
          {role == ERole.USER && (
            <>
              <button className={style.btn}>
                <IoHeartOutline className={style.icon} />
                Thêm vào thư viện
              </button>
              <button className={style.btn}>
                <MdOutlineAccountCircle
                  className={style.icon}
                />
                Hiện trên hồ sơ
              </button>
            </>
          )}
          <button
            className={style.btn}
            onClick={() =>
              navigator.clipboard.writeText(
                window.location.href
              )
            }
          >
            <FaShare className={style.icon} />
            Chia sẻ
          </button>
        </div>
      </>
    </div>
  )
}

export default MoreListHeader
