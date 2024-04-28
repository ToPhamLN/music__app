import React, { useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import { MdAdd, MdCreate } from 'react-icons/md'
import useSWR from 'swr'
import {
  CardPlaylist,
  Playlist,
  SlickPlaylist
} from '~/components/features'
import {
  useAppDispatch,
  useAppSelector,
  useFetcher
} from '~/hooks'
import style from '~/styles/ArtistDetails.module.css'
import { DArtist, DBios, DTrack } from '~/types/data'
import UpdateArtist from './UpdateArtist'
import { ERole } from '~/constants/enum'
import Bios from './Bios'
import { useParams } from 'react-router-dom'
import {
  setIsPlaying,
  setList,
  setTrack
} from '~/reduxStore/trackPlaySlice'

interface BiosData extends DBios {
  createdAt: string
}
const ArtistHome = () => {
  const [openEdit, setEdit] = useState<boolean>(false)
  const [openBios, setOpenBios] = useState<boolean>(false)
  const idParam = useParams().artistParam?.slice(-29, -5)
  const { role, idRole } = useAppSelector(
    (state) => state.profile
  ) as {
    role?: ERole
    idRole?: { _id?: string }
  }
  const dispatch = useAppDispatch()
  const { isPlaying } = useAppSelector(
    (state) => state.trackPlay
  )

  const idArtist = idParam || idRole?._id
  const fetcher = useFetcher()
  const apiArtist = `api/v1/artists/${idArtist}`
  const apiTracks = 'api/v1/tracks/all'
  const apiLists = 'api/v1/listtracks/all'
  const apiBios = `api/v1/bios/${idArtist}`

  const { data: artist, isLoading: loadingArtist } = useSWR(
    apiArtist,
    fetcher
  ) as { data: DArtist; isLoading: boolean }

  const { data: tracks, isLoading: loadingTracks } = useSWR(
    apiTracks,
    () =>
      fetcher(apiTracks, {
        params: {
          author: idArtist
        }
      })
  ) as { data: DTrack[]; isLoading: boolean }
  const { data: lists, isLoading: loadingLists } = useSWR(
    apiLists,
    () =>
      fetcher(apiLists, {
        params: {
          author: idArtist
        }
      })
  )
  const { data: bios, isLoading: loadingBios } = useSWR(
    apiBios,
    fetcher
  ) as {
    data: DBios
    isLoading: boolean
  }

  // ref Menu
  const menuRef = {
    pin: useRef<HTMLDivElement>(null),
    popular: useRef<HTMLDivElement>(null),
    collection: useRef<HTMLDivElement>(null),
    bio: useRef<HTMLDivElement>(null)
  }
  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement>
  ) => {
    if (ref.current)
      ref?.current.scrollIntoView({ behavior: 'smooth' })
  }

  const handleFollow = () => {
    console.log('follow')
  }

  const handlePlay = () => {
    dispatch(setTrack(tracks[0]))
    dispatch(setList(tracks))
    dispatch(setIsPlaying(true))
    if (isPlaying) dispatch(setIsPlaying(false))
  }
  return (
    <div className={style.artist__details}>
      <div className={style.background}>
        {artist?.background?.path && (
          <div className={style.image}>
            <img src={artist?.background?.path} alt='' />
          </div>
        )}
        <div className={style.artist__info}>
          <div
            className={`${style.artist__avatar} ${loadingArtist ? 'loading' : ''}`}
          >
            <img
              src={
                artist?.avatar?.path ||
                '/src/assets/account-default.png'
              }
              alt=''
            />
          </div>
          <div className={style.right}>
            <h1 className={style.artist__name}>
              {artist?.username}
            </h1>
            <div
              className={`${style.statistical}  ${loadingArtist ? 'loading' : ''}`}
            >
              <span> 28K Lượt nghe</span>
              <span> 27K Lượt thích</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`${style.header} `}>
        <div className={style.menu}>
          <button
            onClick={() => scrollToSection(menuRef.pin)}
          >
            Nổi bật
          </button>
          <button
            onClick={() => scrollToSection(menuRef.popular)}
          >
            Phổ biến
          </button>
          <button
            onClick={() =>
              scrollToSection(menuRef.collection)
            }
          >
            Bộ sưu tập
          </button>
          <button
            onClick={() => scrollToSection(menuRef.bio)}
          >
            Tiểu sử
          </button>
        </div>
        <div className={style.handler}>
          {role === ERole.ARTIST ? (
            <button
              className={style.btn}
              onClick={() => setEdit(true)}
            >
              <MdCreate className={style.icon} />
              Chỉnh sửa
            </button>
          ) : (
            <button
              className={style.btn}
              onClick={handleFollow}
            >
              <MdAdd className={style.icon} />
              Theo dõi
            </button>
          )}
        </div>
      </div>
      <div className={style.map} ref={menuRef.pin}>
        <div className={style.pin}>
          <h1>Nổi bật</h1>
          <div className={`${style.container}`}>
            <CardPlaylist listTrack={{}} />
          </div>
        </div>
      </div>
      <div
        className={style.popular__songs}
        ref={menuRef.popular}
      >
        <h1>Phổ biến</h1>
        {role !== ERole.ARTIST && (
          <button
            className={style.play__playlist}
            onClick={handlePlay}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        )}
        <div
          className={`${style.popular__songs__container} ${loadingTracks ? 'loading' : ''}`}
        >
          {tracks?.length > 0 && <Playlist list={tracks} />}
        </div>
      </div>
      <div className={style.map} ref={menuRef.collection}>
        {loadingLists ? (
          <div className={style.popular__songs}>
            <div
              className={`${style.popular__songs__container} ${loadingLists ? 'loading' : ''}`}
            ></div>
          </div>
        ) : (
          <SlickPlaylist
            listListTrack={lists}
            nameSection='Bộ sưu tập'
          />
        )}
      </div>
      <div className={style.artist__bio} ref={menuRef.bio}>
        <h1>Tiểu sử</h1>
        <article
          className={`${style.container} ${loadingBios ? 'loading' : ''}`}
          role='button'
          onClick={() => setOpenBios(true)}
        >
          <img src={bios?.photos[0]?.path} alt='' />
        </article>
      </div>
      {openEdit && (
        <UpdateArtist setExit={setEdit} artist={artist} />
      )}
      {openBios && (
        <Bios
          setExit={setOpenBios}
          bios={bios as BiosData}
        />
      )}
    </div>
  )
}
export default ArtistHome
