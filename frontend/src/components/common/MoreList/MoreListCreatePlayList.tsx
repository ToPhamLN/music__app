import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import {
  MdOutlineAdd,
  MdOutlineClose
} from 'react-icons/md'
import style from '~/styles/MoreList.module.css'

const MoreListCreatePlayList: React.FC = () => {
  const [validSearch, setValidSearch] = useState<string>('')
  return (
    <div className={style.add__playlist}>
      <div className={style.searchlist}>
        <button className={style.icon}>
          <FaSearch />
        </button>
        <input
          type='text'
          name='search'
          placeholder='Tìm kiếm _ _ _'
          autoComplete='off'
          value={validSearch}
          onChange={(e) => setValidSearch(e.target.value)}
        />
        {validSearch && (
          <button
            className={style.icon}
            onClick={() => setValidSearch('')}
          >
            <MdOutlineClose />
          </button>
        )}
      </div>
      <button className={style.add__new}>
        <MdOutlineAdd className={style.icon} />
        Tạo danh sách mới
      </button>
      <div className={style.my__list}>
        <button className={style.add__new}>
          <span>
            asdfa sdafwe dsfwe fwewqeeeeeeqwrwq ee ew
          </span>
        </button>
        <button className={style.add__new}>
          <span>asdfa sdafwe dsfwe fwewqeeeeeeqwrwq</span>
        </button>{' '}
        <button className={style.add__new}>
          <span>asdfa sdafwe dsfwe fwewqeeeeeeqwrwq</span>
        </button>{' '}
        <button className={style.add__new}>
          <span>asdfa sdafwe dsfwe fwewqeeeeeeqwrwq</span>
        </button>
      </div>
    </div>
  )
}

export default MoreListCreatePlayList
