import React, { useState } from 'react'
import style from '~/styles/Navbar.module.css'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineClose } from 'react-icons/md'
import { Link } from 'react-router-dom'

const SearchNav: React.FC = () => {
  const [valid, setValid] = useState('')
  const handleSearch = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
  }
  return (
    <Link to={'/search'}>
      <form className={style.search__nav}>
        <div className={style.input__box}>
          <button
            className={style.icon}
            onClick={(e) => handleSearch(e)}
          >
            <FaSearch />
          </button>
          <input
            type='text'
            name='search'
            placeholder='Tìm kiếm _ _ _'
            autoComplete='off'
            value={valid}
            onChange={(e) => setValid(e.target.value)}
          />
          {valid && (
            <button
              className={style.icon}
              onClick={() => setValid('')}
            >
              <MdOutlineClose />
            </button>
          )}
        </div>
        <div className={style.content}></div>
      </form>
    </Link>
  )
}

export default SearchNav
