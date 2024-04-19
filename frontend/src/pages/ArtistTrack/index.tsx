import React from 'react'
import useSWR from 'swr'
import { Playlist } from '~/components/features'
import { useFetcher } from '~/hooks'
import style from '~/styles/ArtistTrack.module.css'

const ArtistTrack = () => {
  const fetcher = useFetcher()
  const { data: list } = useSWR(
    'api/v1/tracks/all',
    fetcher
  )

  return (
    <div className={style.artist__track}>
      <h1>Danh sách bài hát của tôi</h1>
      <Playlist list={list} />
    </div>
  )
}

export default ArtistTrack
