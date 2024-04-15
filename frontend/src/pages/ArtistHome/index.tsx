import React, { useEffect, useRef, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { MdAdd, MdCreate } from 'react-icons/md'
import useSWR from 'swr'
import {
  Playlist,
  SlickPlaylist
} from '~/components/features'
import SlickPeople from '~/components/features/SlickPeple'
import { useAppSelector, useFetcher } from '~/hooks'
import style from '~/styles/ArtistDetails.module.css'
import { DArtist } from '~/types/data'
import UpdateArtist from './UpdateArtist'

const ArtistHome = () => {
  const [openEdit, setEdit] = useState<boolean>(false)
  const { _id } = useAppSelector(
    (state) => state.profile?.idRole
  ) as { _id: string }
  const fetcher = useFetcher()
  const { data: artist, isLoading: loadingArtist } = useSWR(
    `api/v1/artists/${_id}`,
    fetcher
  ) as { data: DArtist; isLoading: boolean }

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
  return (
    <div className={style.artist__details}>
      <div className={style.background}>
        {artist?.background && (
          <div className={style.image}>
            <img src={artist?.background?.path} alt='' />
          </div>
        )}
        <div className={style.artist__info}>
          <div className={style.artist__avatar}>
            <img src={artist?.avatar?.path} alt='' />
          </div>
          <div className={style.right}>
            <h1 className={style.artist__name}>
              {artist?.username}
            </h1>
            <div className={style.statistical}>
              <span> 28K Lượt nghe</span>
              <span> 27K Lượt thích</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.header} '' `}>
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
          <button
            className={style.btn}
            onClick={() => setEdit(true)}
          >
            <MdCreate className={style.icon} />
            Chỉnh sửa
          </button>
        </div>
      </div>
      <div className={style.map} ref={menuRef.pin}>
        <SlickPlaylist />
      </div>
      <div
        className={style.popular__songs}
        ref={menuRef.popular}
      >
        <h1>Phổ biến</h1>
        <button className={style.play__playlist}>
          <FaPlay />
        </button>
        <Playlist />
        <button className={style.more__watch}>
          Xem thêm / Ẩn bớt
        </button>
      </div>
      <div className={style.map} ref={menuRef.collection}>
        <SlickPlaylist />
      </div>
      <div className={style.artist__bio} ref={menuRef.bio}>
        <h1>Tiểu sử</h1>
        <article className={style.container}></article>
      </div>
      {openEdit && (
        <UpdateArtist setExit={setEdit} artist={artist} />
      )}
    </div>
  )
}
export default ArtistHome
