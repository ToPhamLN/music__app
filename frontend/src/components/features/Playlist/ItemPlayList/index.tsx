import { useState, useRef, MouseEvent } from 'react'
import { IoHeartOutline } from 'react-icons/io5'
import { LuMoreHorizontal } from 'react-icons/lu'
import { FaPlay, FaPause } from 'react-icons/fa'
import style from '~/styles/PlayListDetails.module.css'
import { Link } from 'react-router-dom'
import {
  useHover,
  useClickOutside,
  useAppSelector,
  useAppDispatch
} from '~/hooks'
import TrackAnimation from '../../../common/TrackAnimation'
import { MoreList } from '~/components/common'
import { ERole } from '~/constants/enum'
import { DTrack } from '~/types/data'
import { formatDay, formatTime } from '~/utils/format'
import {
  setIsPlaying,
  setList,
  setTrack
} from '~/reduxStore/trackPlaySlice'

interface Props {
  track: DTrack
  list: DTrack[]
  index: number
}

const ItemPlayList = ({ track, list, index }: Props) => {
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
  const dispatch = useAppDispatch()
  const { isPlaying, track: trackPlaying } = useAppSelector(
    (state) => state.trackPlay
  )
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
    const { top, left } =
      event.currentTarget.getBoundingClientRect()

    setLocation({
      top: scrollY + top,
      left: scrollX + left
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

  const { role } = useAppSelector((state) => state.profile)

  const handlePlay = () => {
    dispatch(setTrack(track))
    dispatch(setList(list))
    dispatch(setIsPlaying(true))
    if (isPlaying && trackPlaying == track)
      dispatch(setIsPlaying(false))
  }

  return (
    <div className={style.song__item}>
      <div className={style.song__index}>{index}</div>
      <div className={style.song__title}>
        <div className={style.song__image}>
          <img
            src={track?.photo?.path}
            alt={track?.photo?.fileName}
          />
          {role !== ERole.ARTIST && (
            <>
              {isPlaying && trackPlaying == track && (
                <div className={style.song__animation}>
                  <TrackAnimation />
                </div>
              )}
              <div className={style.song__play}>
                <button onClick={handlePlay}>
                  {isPlaying && trackPlaying == track ? (
                    <FaPause />
                  ) : (
                    <FaPlay />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
        <div className={style.song__name__album}>
          <div
            className={style.song__name}
            onMouseEnter={handleNameMouseEnter}
            onMouseLeave={handleNameMouseLeave}
          >
            <Link
              to={`/track/${track?.slug}${track?._id}.html`}
            >
              {track?.title}
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
                {track?.title}
              </div>
            )}
          </div>
          <div
            className={style.song__artist}
            onMouseEnter={handleArtistMouseEnter}
            onMouseLeave={handleArtistMouseLeave}
          >
            {track.author && (
              <Link
                key={track.author._id}
                to={`/artist/${track.author?.slug}${track?.author?._id}.html`}
              >
                {track?.author?.username}
              </Link>
            )}
            {track.artist?.map((artist) => (
              <Link
                key={artist._id}
                to={`/artist/${artist?.slug}${artist?._id}.html`}
              >
                {artist.username}
              </Link>
            ))}
            {isArtistHovered && (
              <div
                className={style.hover__content}
                style={{
                  position: 'fixed',
                  top: artistHoverPosition.top,
                  left: artistHoverPosition.left
                }}
              >
                {track.artist?.map((artist) => (
                  <span key={artist._id}>
                    {artist.username}
                  </span>
                ))}
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
        <Link
          to={`/album/${track?.album?.slug}${track?.album?._id}.html`}
        >
          {track?.album?.title}
        </Link>
        {isAlbumHovered && (
          <div
            className={style.hover__content}
            style={{
              position: 'fixed',
              top: albumHoverPosition.top,
              left: albumHoverPosition.left
            }}
          >
            {track?.album?.title}
          </div>
        )}
      </div>
      <div className={style.song__day}>
        {formatDay(track?.updatedAt as string)}
      </div>

      {role !== ERole.ARTIST && (
        <div className={style.song__like}>
          <button className={style.btn}>
            <IoHeartOutline />
          </button>
        </div>
      )}
      <div className={style.song__control}>
        <span className={style.duration}>
          {formatTime(track?.duration as number)}
        </span>
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
          track={track}
        />
      )}
    </div>
  )
}

export default ItemPlayList
