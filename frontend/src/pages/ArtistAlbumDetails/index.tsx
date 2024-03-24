import React, {
  useState,
  useRef,
  MouseEvent,
  useEffect
} from 'react'
import { IoMdDownload } from 'react-icons/io'
import { IoHeartOutline } from 'react-icons/io5'
import {
  MdAudiotrack,
  MdOutlineAccessTime,
  MdOutlineMoreVert
} from 'react-icons/md'
import style from '~/styles/ArtistAlbumDetails.module.css'
import { MoreListHeader } from '~/components/common'
import { useAxiosPrivate, useClickOutside } from '~/hooks'
import { useParams } from 'react-router-dom'
import { DListTrack } from '~/types/data'

const ArtistAlbumDetails: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
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
  const [album, setAlbum] = useState<DListTrack>({})
  const axios = useAxiosPrivate()
  const idAlbum = useParams().albumParam?.slice(-29, -5)

  //MoreListHeader
  const toggleMoreVisible = () => {
    setIsMoreVisible((prev) => !prev)
  }
  const CloseOptionHandler = () => {
    toggleMoreVisible()
  }
  const OpenMoreHandler = (
    event: MouseEvent<HTMLElement>
  ) => {
    const { innerHeight, innerWidth } = window
    const { top, left } =
      event.currentTarget.getBoundingClientRect()
    let newTop = innerHeight
    if (window.scrollY + top < innerHeight) {
      newTop = window.scrollY + top
    }
    const bonusLeft = innerWidth >= 600 ? 300 : 120
    setLocation({
      top: newTop,
      left: window.scrollX + left + bonusLeft
    })
    toggleMoreVisible()
    console.log(innerWidth)
  }
  useClickOutside(moreOptionRef, CloseOptionHandler)

  //Handle Get Album
  const handleGetAlbum = async () => {
    try {
      const res = await axios.get(
        `api/v1/listtracks/albumforartist/${idAlbum}`
      )
      setAlbum(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    handleGetAlbum()
  }, [])

  return (
    <div className={style.artist__album__details}>
      <div className={style.information}>
        <div
          className={style.background}
          style={{ background: album.background }}
        ></div>
        <div className={style.container__information}>
          <div className={style.photo}>
            <img
              src={album?.photo?.path}
              alt={album?.photo?.fileName}
            />
          </div>
          <h1 className={style.listtrack__title}>
            {album.title}
          </h1>
        </div>
      </div>
      <div className={style.desc}>
        {album?.description
          ?.split('\n')
          .map((item, index) => (
            <div key={index}>{item}</div>
          ))}
      </div>
      <div className={style.more__information}>
        <div className={style.info__user}>
          <div className={style.img__user}>
            <img
              src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
              alt='Poster List'
            />
          </div>
          <span className={style.user__name}>eeee</span>
        </div>
        <ul className={style.statistics}>
          <li>
            5,131,321 <IoHeartOutline />
          </li>
          <li>
            100 <MdAudiotrack />
          </li>
          <li>
            6h <MdOutlineAccessTime />
          </li>
        </ul>
      </div>
      <div className={style.control}>
        <button className={style.like}>
          <IoHeartOutline />
        </button>
        <button className={style.download}>
          <IoMdDownload />
        </button>
        <button
          className={style.more}
          onClick={OpenMoreHandler}
        >
          <MdOutlineMoreVert />
        </button>
      </div>
      {isMoreVisible && (
        <MoreListHeader
          refItem={moreOptionRef}
          location={location}
        />
      )}
    </div>
  )
}

export default ArtistAlbumDetails
