import React from 'react'
import style from '~/styles/Mylist.module.css'
import style2 from '~/styles/Card.module.css'
import { CardListTrackArtist } from '~/components/features'
import { DListTrack } from '~/types/data'
import { useAppSelector, useFetcher } from '~/hooks'
import useSWR from 'swr'

const Mylist: React.FC = () => {
  const { idRole } = useAppSelector(
    (state) => state.profile
  )
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

  const wishTrack: DListTrack = {
    title: 'Danh sách ưu thích',
    description: 'Danh sách bài hát ưa thích của tôi',
    photo: {
      path: '/src/assets/wish.png',
      fileName: 'wishList'
    },
    list: []
  }
  return (
    <div className={style.mylist}>
      <div className={style.map}>
        <h1>Danh sách của tôi</h1>
        <div className={style2.grid}>
          <CardListTrackArtist
            listTrack={wishTrack}
            type={'wishTrack'}
          />
          {playistCreated?.map((listTrack) => (
            <CardListTrackArtist
              key={listTrack._id}
              listTrack={listTrack}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Mylist
