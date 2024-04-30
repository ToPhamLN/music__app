import React, { useEffect, useRef, useState } from 'react'
import style from '~/styles/Player.module.css'
import {
  IoPlayCircle,
  IoPlayBack,
  IoPlayForward,
  IoPauseCircle,
  IoHeartSharp,
  IoHeartOutline
} from 'react-icons/io5'
import {
  TbArrowsShuffle2,
  TbArrowCapsule
} from 'react-icons/tb'
import { RiPlayListFill } from 'react-icons/ri'
import { MdLyrics } from 'react-icons/md'
import {
  ImVolumeMedium,
  ImVolumeMute2
} from 'react-icons/im'
import { BsFilePlayFill } from 'react-icons/bs'
import { formatTime } from '~/utils/format'
import {
  useAppDispatch,
  useAppSelector,
  useAxiosPrivate,
  useFetcher
} from '~/hooks'

import {
  setWaitingList,
  setTrack,
  setVolume,
  setCurrentTime,
  setMode,
  setIsPlaying
} from '~/reduxStore/trackPlaySlice'
import { reverseSuffle, sortPlayList } from '~/utils/array'
import { setIsView } from '~/reduxStore/globalSlice'
import { DInteraction, DTrack } from '~/types/data'
import useSWR, { mutate } from 'swr'

const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    waitingList,
    list,
    track,
    volume,
    currentTime,
    mode,
    isPlaying
  } = useAppSelector((state) => state.trackPlay)
  const { view } = useAppSelector((state) => state.global)
  const [duration, setDuration] = useState<number>(0)
  const dispatch = useAppDispatch()
  const { idRole } = useAppSelector(
    (state) => state.profile
  )
  const fetcher = useFetcher()
  const axios = useAxiosPrivate()

  const togglePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying))
  }

  const handleShuffle = () => {
    dispatch(
      setMode({
        ...mode,
        isSuffle: !mode.isSuffle
      })
    )
  }

  const handleLoopRePlay = () => {
    if (mode.isLoop)
      dispatch(
        setMode({ ...mode, isLoop: false, isReplay: true })
      )

    if (mode.isReplay)
      dispatch(
        setMode({ ...mode, isLoop: false, isReplay: false })
      )

    if (!mode.isLoop && !mode.isReplay)
      dispatch(
        setMode({ ...mode, isLoop: true, isReplay: false })
      )
  }

  const handleSeek = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const audio = audioRef.current
    const { value } = event.target
    if (audio) {
      audio.currentTime = parseFloat(value)
      dispatch(setCurrentTime(parseFloat(value)))
    }
  }

  const handleVolume = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const audio = audioRef.current
    const { value } = event.target
    let isMuteValue = false
    if (value === '0') isMuteValue = true
    if (audio) {
      audio.volume = parseFloat(value)
      dispatch(
        setVolume({
          isMute: isMuteValue,
          value: parseFloat(value)
        })
      )
    }
  }

  const handleMute = () => {
    const audio = audioRef.current
    if (audio) {
      if (!volume.isMute) {
        audio.volume = 0
      } else {
        audio.volume = volume.value
      }
    }
    dispatch(
      setVolume({
        isMute: !volume.isMute,
        value: volume.value
      })
    )
  }

  const handleReplay = () => {
    const audio = audioRef.current
    if (audio) {
      audio.load()
      dispatch(setIsPlaying(true))
      audio.play()
    }
  }

  const handlePlayForward = () => {
    const newList: DTrack[] = sortPlayList(1, waitingList)
    dispatch(setTrack(newList[0]))
    dispatch(setWaitingList(newList))
  }

  const handlePlayBack = () => {
    const newList: DTrack[] = sortPlayList(-1, waitingList)
    dispatch(setTrack(newList[0]))
    dispatch(setWaitingList(newList))
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      handleReplay()
    }
  }, [track])

  useEffect(() => {
    if (mode.isSuffle) {
      const newList = reverseSuffle(list)
      dispatch(setWaitingList(newList))
    } else {
      dispatch(setWaitingList(list))
    }
  }, [mode])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleTimeUpdate = () => {
        dispatch(setCurrentTime(audio.currentTime))
      }

      const handleLoadedMetadata = () => {
        setDuration(audio.duration)
      }

      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener(
        'loadedmetadata',
        handleLoadedMetadata
      )
      audio.currentTime = currentTime
      if (volume.isMute) {
        audio.volume = 0
      } else {
        audio.volume = volume.value
      }
      audio.pause()
      dispatch(setIsPlaying(false))

      return () => {
        audio.addEventListener(
          'timeupdate',
          handleTimeUpdate
        )
        audio.addEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        )
      }
    }
  }, [])
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }, [isPlaying])

  //

  const { data: interaction } = useSWR(
    `api/v1/interactions/${idRole?._id}`,
    fetcher
  ) as { data: DInteraction }

  const likedTrack = track?._id
    ? interaction?.wishTrack?.includes(track?._id)
    : false

  const handleLikeTrack = async () => {
    if (idRole?._id && track?._id)
      try {
        await axios.put(
          `api/v1/interactions/wish/track/${track?._id}`
        )
        mutate(`api/v1/interactions/${idRole?._id}`)
      } catch (error) {
        console.log(error)
      }
  }

  const handleAddReacently = async () => {
    if (idRole?._id && track?._id)
      try {
        await axios.put(
          `api/v1/interactions/recently/track/${track?._id}`
        )
        mutate(`api/v1/interactions/${idRole?._id}`)
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    handleAddReacently()
  }, [track])

  return (
    <div
      className={`${style.player} ${!track && style.no__track}`}
    >
      <div className={style.track__info}>
        <div className={style.track__img}>
          <img
            src={track?.photo?.path}
            alt='Poster Track'
          />
        </div>
        <div>
          <h1 className={style.track__name}>
            {track?.title}
          </h1>
          <p className={style.track__artist}>
            {track?.artist?.map((artist) => (
              <span key={artist._id}>
                {artist.username}
              </span>
            ))}
          </p>
        </div>
        <button
          className={style.track__like}
          hover-content={'Lưa vào Thư viện'}
          onClick={handleLikeTrack}
        >
          {likedTrack ? (
            <IoHeartSharp />
          ) : (
            <IoHeartOutline />
          )}
        </button>
      </div>
      <div className={style.track__process}>
        <audio
          ref={audioRef}
          onEnded={
            mode.isReplay ? handleReplay : handlePlayForward
          }
        >
          <source
            src={track?.source?.path}
            type='audio/mpeg'
          />
          <track
            kind='captions'
            label='English'
            srcLang='en'
          />
        </audio>
        <div className={style.track__control}>
          <div className={style.left}>
            <button
              className={style.like}
              onClick={handleLikeTrack}
            >
              {likedTrack ? (
                <IoHeartSharp />
              ) : (
                <IoHeartOutline />
              )}
            </button>
            <button
              className={`${style.suffle} ${mode.isSuffle && style.choose}`}
              onClick={handleShuffle}
            >
              <TbArrowsShuffle2 />
            </button>
            <button
              className={style.playback}
              onClick={handlePlayBack}
            >
              <IoPlayBack />
            </button>
          </div>
          <button
            className={style.play}
            onClick={togglePlayPause}
          >
            {!isPlaying ? (
              <IoPlayCircle />
            ) : (
              <IoPauseCircle />
            )}
          </button>
          <div className={style.right}>
            <button
              className={style.playforward}
              onClick={handlePlayForward}
            >
              <IoPlayForward />
            </button>
            <button
              onClick={handleLoopRePlay}
              className={`${mode.isReplay && style.replay} ${mode.isLoop && style.loop}`}
            >
              <TbArrowCapsule />
            </button>
            <button
              hover-content={'Lời bài hát'}
              className={style.lyrics}
            >
              <MdLyrics />
            </button>
            <button
              hover-content={'Danh sách chờ'}
              onClick={() =>
                dispatch(setIsView(!view.isView))
              }
              className={`${style.queue} ${view.isView ? style.choose : ''}`}
            >
              <RiPlayListFill />
            </button>
          </div>
        </div>
        <div className={style.track__range}>
          <span>{formatTime(currentTime)}</span>
          <input
            type='range'
            value={currentTime}
            max={duration || 0}
            onChange={handleSeek}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className={style.track__option}>
        <button
          hover-content={'Chế độ xem'}
          className={style.watch__mode}
        >
          <BsFilePlayFill />
        </button>
        <button hover-content={'Lời bài hát'}>
          <MdLyrics />
        </button>
        <button
          onClick={handleMute}
          hover-content={
            volume.isMute ? 'Hủy tắt tiếng' : 'Tắt tiếng'
          }
        >
          {volume.isMute ? (
            <ImVolumeMute2 />
          ) : (
            <ImVolumeMedium />
          )}
        </button>
        <input
          type='range'
          value={volume.isMute ? 0 : volume.value}
          max={1}
          onChange={handleVolume}
          step={0.1}
          className={style.input__volume}
        />
        <div
          style={{
            height: '3rem',
            width: '1px',
            background: 'var(--text-color)'
          }}
        ></div>
        <button
          hover-content={'Danh sách chờ'}
          onClick={() => dispatch(setIsView(!view.isView))}
          className={view.isView ? style.choose : ''}
        >
          <RiPlayListFill />
        </button>
      </div>
    </div>
  )
}

export default Player
