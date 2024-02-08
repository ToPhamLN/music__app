import React from 'react'
import style from '~/styles/Viewbar.module.css'
import { LuAlarmClock, LuMoreHorizontal } from 'react-icons/lu'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { setIsRecently } from '~/reduxStore/globalSlice'
import ItemViewBar from '~/components/ItemViewBar'

const Viewbar: React.FC = () => {
  const { view } = useAppSelector((state) => state.global)
  const { track } = useAppSelector((state) => state.trackPlay)
  const dispatch = useAppDispatch()
  return (
    <div
      className={`${style.viewbar} ${track ? '' : style.no__track}`}
    >
      <div className={style.header}>
        <div className={style.playlist__switch}>
          <button
            className={view.isRecently ? '' : style.focus}
            onClick={() => dispatch(setIsRecently(false))}
          >
            Danh sách phát
          </button>
          <button
            className={view.isRecently ? style.focus : ''}
            onClick={() => dispatch(setIsRecently(true))}
          >
            Nghe gần đây
          </button>
        </div>
        <button className={style.btn__header}>
          <LuAlarmClock />
        </button>
        <button className={style.btn__header}>
          <LuMoreHorizontal />
        </button>
      </div>

      <div className={style.top}>
        <h2 style={{ textAlign: 'center' }}>Đang phát</h2>
        <ItemViewBar />
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
        <ItemViewBar />
        <ItemViewBar />
        <ItemViewBar /> <ItemViewBar />
        <ItemViewBar />
        <ItemViewBar /> <ItemViewBar />
        <ItemViewBar />
        <ItemViewBar /> <ItemViewBar />
        <ItemViewBar />
        <ItemViewBar />
      </div>
    </div>
  )
}

export default Viewbar
