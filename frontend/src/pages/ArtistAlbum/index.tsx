import React, { useEffect, useState } from 'react'
import { CardListTrackArtist } from '~/components/features'
import style from '~/styles/AritstAlbum.module.css'
import style2 from '~/styles/Card.module.css'
import { useAxiosPrivate } from '~/hooks'
import { DListTrack } from '~/types/data'

const ArtistAlbum = () => {
  const [albums, setAlbums] = useState<DListTrack[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const axios = useAxiosPrivate()
  const handleGetAlbums = async () => {
    try {
      const res = await axios.get(
        'api/v1/listtracks/albumsforartist'
      )
      setAlbums(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    handleGetAlbums()
  }, [])

  return (
    <div className={style.artist__album}>
      <h1>Album của tôi</h1>
      <div className={style2.grid}>
        {albums.map((album) => (
          <CardListTrackArtist
            key={album._id}
            listTrack={album}
          />
        ))}
      </div>
    </div>
  )
}

export default ArtistAlbum
