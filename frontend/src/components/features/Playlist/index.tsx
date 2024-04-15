import { MdOutlineAccessTime } from 'react-icons/md'
import style from '~/styles/PlayListDetails.module.css'
import ItemPlayList from './ItemPlayList'
import { DTrack } from '~/types/data'
import { useAppSelector } from '~/hooks'
import { ERole } from '~/constants/enum'

interface Props {
  list: DTrack[] | string[]
}

const Playlist = ({ list }: Props) => {
  const { role } = useAppSelector((state) => state.profile)
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
        />
      ))}
    </div>
  )
}

export default Playlist
