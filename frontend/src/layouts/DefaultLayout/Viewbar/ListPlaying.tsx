import { ItemViewBar } from '~/components/features'
import style from '~/styles/Viewbar.module.css'
import { useAppSelector } from '~/hooks'
import { DInteraction } from '~/types/data'

interface Props {
  interaction: DInteraction
}

const ListPlaying = ({ interaction }: Props) => {
  const { track, waitingList } = useAppSelector(
    (state) => state.trackPlay
  )

  return (
    <div>
      <div className={style.top}>
        <h2 style={{ textAlign: 'center' }}>Đang phát</h2>
        <ItemViewBar
          track={track}
          interaction={interaction}
        />
        <h2 style={{ textAlign: 'center' }}>Tiếp theo</h2>
        <div
          style={{
            height: '2px',
            width: '100%',
            background: 'var(--text)'
          }}
        ></div>
      </div>
      <div className={style.list}>
        {waitingList
          ?.filter((item) => item?._id !== track?._id)
          .map((track, index) => (
            <ItemViewBar
              track={track}
              key={index}
              interaction={interaction}
            />
          ))}
      </div>
    </div>
  )
}

export default ListPlaying
