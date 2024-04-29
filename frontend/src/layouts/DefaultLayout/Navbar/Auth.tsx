import React, {
  useState,
  useRef,
  useEffect,
  useCallback
} from 'react'
import { IoNotifications } from 'react-icons/io5'
import style from '~/styles/Navbar.module.css'
import { IoMdSunny } from 'react-icons/io'
import {
  MdAccountBox,
  MdManageAccounts
} from 'react-icons/md'
import { RiLogoutBoxFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import Notify from './Notify'
import { useAppSelector } from '~/hooks'

const Auth: React.FC = () => {
  const [openMore, setOpenMore] = useState<boolean>(false)
  const [openNotify, setOpenNotify] =
    useState<boolean>(false)

  const notifyRef = useRef<HTMLDivElement | null>(null)
  const moreRef = useRef<HTMLDivElement | null>(null)
  const { idRole } = useAppSelector(
    (state) => state.profile
  )

  const moreHandler = useCallback(() => {
    setOpenMore((p) => !p)
  }, [])

  const notifyHandler = useCallback(() => {
    setOpenNotify((p) => !p)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(event.target as Node)
      ) {
        moreHandler()
      }
      if (
        notifyRef.current &&
        !notifyRef.current.contains(event.target as Node)
      ) {
        notifyHandler()
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [moreRef, notifyRef, moreHandler])

  return (
    <div className={style.nav__auth}>
      <div className={style.notify}>
        <button onClick={notifyHandler}>
          <IoNotifications />
        </button>
      </div>
      <div className={style.auth} onClick={moreHandler}>
        <img
          src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
          alt=''
        />
        {openMore && (
          <div className={style.more__card} ref={moreRef}>
            <Link to={'/account'}>
              <button>
                <MdManageAccounts />
                Tải khoản
              </button>
            </Link>
            {idRole?._id && (
              <Link
                to={`/user/${idRole.slug}${idRole?._id}.html`}
              >
                <button>
                  <MdAccountBox />
                  Hồ sơ
                </button>
              </Link>
            )}
            <button>
              <IoMdSunny />
              Sáng
            </button>
            <button>
              <RiLogoutBoxFill />
              Đăng xuất
            </button>
          </div>
        )}
        {openNotify && (
          <Notify
            refItem={notifyRef}
            setExit={() => setOpenNotify(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Auth
