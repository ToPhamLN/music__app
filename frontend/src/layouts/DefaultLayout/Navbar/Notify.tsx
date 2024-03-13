import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { ItemNotify } from '~/components/features'
import style from '~/styles/Navbar.module.css'

interface Props {
  refItem: React.MutableRefObject<HTMLDivElement | null>
  setExit: () => void
}

const Notify = ({ refItem, setExit }: Props) => {
  return (
    <div className={style.more__notify} ref={refItem}>
      <div className={style.header}>
        <h2>Thông báo</h2>
        <button className={style.icon} onClick={setExit}>
          <MdOutlineClose />
        </button>
      </div>
      <div className={style.content}>
        <ItemNotify />
        <ItemNotify />
        <ItemNotify />
        <ItemNotify />
      </div>
    </div>
  )
}

export default Notify
