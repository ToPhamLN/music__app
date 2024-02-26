import React, { useEffect, useRef, useState } from 'react'
import style from '~/styles/Player.module.css'
import {
  IoPlayCircle,
  IoPlayBack,
  IoPlayForward,
  IoPauseCircle
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
import { useAppDispatch, useAppSelector } from '~/hooks'

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
import { PlayerTrack } from '~/components/features'

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

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      dispatch(setIsPlaying(!isPlaying))
    }
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
      audio.play()
    }
  }

  const handlePlayForward = () => {
    const newList: PlayListType = sortPlayList(
      1,
      waitingList
    )
    dispatch(setTrack(newList[0]))
    dispatch(setWaitingList(newList))
  }

  const handlePlayBack = () => {
    const newList: PlayListType = sortPlayList(
      -1,
      waitingList
    )
    dispatch(setTrack(newList[0]))
    dispatch(setWaitingList(newList))
  }

  // Replay audio and change "waitingList" depending on random mode or not
  useEffect(() => {
    const audio = audioRef.current
    handleReplay()
    if (audio) {
      dispatch(setIsPlaying(true))
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
    dispatch(setIsPlaying(false))
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

  return (
    <div
      className={`${style.player} ${!track && style.no__track}`}
    >
      <PlayerTrack />
      <div className={style.track__process}>
        <audio
          ref={audioRef}
          onEnded={
            mode.isReplay ? handleReplay : handlePlayForward
          }
        >
          <source
            src={track?.src?.path}
            type='audio/mpeg'
          />
          <track
            kind='captions'
            label='English'
            srcLang='en'
          />
        </audio>
        <div className={style.track__control}>
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
