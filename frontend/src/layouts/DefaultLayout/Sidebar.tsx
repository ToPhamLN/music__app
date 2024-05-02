import React, { useEffect, useState } from 'react'

import style from '~/styles/Sidebar.module.css'
import { GrHomeRounded } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import {
  MdOutlineAdd,
  MdOutlineCategory,
  MdOutlineBookmarkBorder,
  MdOutlineEmojiEvents
} from 'react-icons/md'
import { ItemListBar } from '~/components/features'
import { DInteraction, DListTrack } from '~/types/data'
import {
  useAppSelector,
  useAxiosPrivate,
  useFetcher
} from '~/hooks'
import useSWR from 'swr'
const Sidebar: React.FC = () => {
  const { isSidebar } = useAppSelector(
    (state) => state.global
  )

  const [wishList, setWishList] = useState<DListTrack[]>([])
  const { idRole } = useAppSelector(
    (state) => state.profile
  )
  const axios = useAxiosPrivate()
  const fetcher = useFetcher()
  const API = 'api/v1/listtracks/all' as string
  const { data: playistCreated } = useSWR(API, () =>
    fetcher(API, {
      params: {
        author: idRole?._id
      }
    })
  ) as {
    data: DListTrack[]
  }

  const { data: interaction } = useSWR(
    `api/v1/interactions/${idRole?._id}`,
    fetcher
  ) as { data: DInteraction }

  const wishTrack: DListTrack = {
    title: 'Danh sách ưu thích',
    description: 'Danh sách bài hát ưa thích của tôi',
    photo: {
      path: '/src/assets/wish.png',
      fileName: 'wishList'
    },
    list: []
  }

  const getTrack = async (id: string) => {
    try {
      const res = await axios.get(`api/v1/listtracks/${id}`)
      return res.data
    } catch (error) {
      console.log(error)
      return null
    }
  }
  useEffect(() => {
    if (interaction && interaction.wishTrack) {
      const fetchTrackDetails = async () => {
        const trackDetailsPromises =
          interaction.wishList.map(async (trackId) => {
            const trackData = await getTrack(trackId)
            return trackData
          })

        const trackDetails = await Promise.all(
          trackDetailsPromises
        )

        setWishList(trackDetails.filter(Boolean))
      }

      fetchTrackDetails()
    }
  }, [interaction])
  return (
    <div
      className={`${style.sidebar} ${isSidebar && style.show}`}
    >
      <div className={style.menu}>
        <Link to={'/'} className={style.link}>
          <GrHomeRounded className={style.icon} />
          <span className={style.link__name}>
            Trang chủ
          </span>
          <div className={style.hover__content}>
            Trang chủ
          </div>
        </Link>
        <Link to={'/rank'} className={style.link}>
          <MdOutlineEmojiEvents className={style.icon} />
          <span className={style.link__name}>Xếp hạng</span>
          <div className={style.hover__content}>
            Xếp hạng
          </div>
        </Link>
        <Link to={'/genre'} className={style.link}>
          <MdOutlineCategory className={style.icon} />
          <span className={style.link__name}>Chủ đề</span>
          <div className={style.hover__content}>Chủ đề</div>
        </Link>
        <div
          style={{
            height: '2px',
            width: '100%',
            background: 'var(--text)'
          }}
        ></div>
        <Link to={'/mylist'} className={style.link}>
          <MdOutlineBookmarkBorder />
          <span className={style.link__name}>Thư viện</span>
          <div className={style.hover__content}>
            Thư viện
          </div>
        </Link>
      </div>
      <div className={style.my__list}>
        <ItemListBar
          listTrack={wishTrack}
          type={'wishTrack'}
        />
        {playistCreated?.map((listTrack) => (
          <ItemListBar
            key={listTrack._id}
            listTrack={listTrack}
          />
        ))}
        {wishList?.map((listTrack) => (
          <ItemListBar
            key={listTrack._id}
            listTrack={listTrack}
          />
        ))}
      </div>
      <div className={style.menu}>
        <Link to={'mylist/create'} className={style.link}>
          <MdOutlineAdd className={style.icon} />
          <span className={style.link__name}>
            Thêm playlist mới
          </span>
          <div className={style.hover__content}>
            Thêm playlist mới
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
