import { MdOutlineAccessTime } from 'react-icons/md'
import style from '~/styles/PlayListDetails.module.css'
import ItemPlayList from './ItemPlayList'
import { DTrack } from '~/types/data'
import { useAppSelector, useFetcher } from '~/hooks'
import { ERole } from '~/constants/enum'
import { useEffect } from 'react'
import useSWR from 'swr'

interface Props {
  list: DTrack[] | string[]
}

const Playlist = ({ list }: Props) => {
  const { role, idRole } = useAppSelector(
    (state) => state.profile
  )
  const userID = role == ERole.USER ? idRole?._id : null
  const fetcher = useFetcher()
  const { data: interaction } = useSWR(
    userID ? `api/v1/interactions/${userID}` : null,
    fetcher
  )

  useEffect(() => {
    console.log('mount playlist:', interaction)
  }, [interaction, userID])
  return (
    <div className={style.playlist__songs}>
      <div className={style.column__name}>
        <div className={style.column__index}>#</div>
        <div className={style.column__title}>Tiêu đề</div>
        <div className={style.column__album}>Album</div>
        <div className={style.column__day}>
          Ngày cập nhập
        </div>
        {role != ERole.ARTIST && (
          <div className={style.column__like}></div>
        )}
        <div className={style.column__duration}>
          <MdOutlineAccessTime />
        </div>
      </div>
      {list?.map((track, index) => (
        <ItemPlayList
          key={index}
          track={track as DTrack}
          list={list as DTrack[]}
          index={index + 1}
          interaction={interaction}
        />
      ))}
    </div>
  )
}

export default Playlist
