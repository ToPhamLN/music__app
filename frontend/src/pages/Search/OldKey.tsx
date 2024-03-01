import { FaSearch } from 'react-icons/fa'
import { MdOutlineClose } from 'react-icons/md'
import style from '~/styles/Search.module.css'
const OldKey = () => {
  return (
    <div className={style.old__key}>
      <h1>Tìm kiếm gần đây</h1>

      <div className={style.container}>
        <ChildKey />
        <ChildKey />
        <ChildKey />
        <ChildKey />
        <ChildKey />
        <ChildKey />
      </div>
      <div className={style.container}>
        <EnteredSearch />
        <EnteredSearch />
        <EnteredSearch />
        <EnteredSearch />
        <EnteredSearch />
        <EnteredSearch />
      </div>
    </div>
  )
}

export default OldKey

export const ChildKey = () => {
  return (
    <div className={style.child}>
      <div className={style.icon}>
        <FaSearch />
      </div>
      <div className={style.name}>name name name name</div>
      <button className={style.delete}>
        <MdOutlineClose />
      </button>
    </div>
  )
}

export const EnteredSearch = () => {
  return (
    <div className={style.child}>
      <div className={style.icon}>
        <img
          src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
          alt=''
        />
      </div>
      <div className={style.name}>
        name name name name name name
      </div>
      <button className={style.delete}>
        <MdOutlineClose />
      </button>
    </div>
  )
}
