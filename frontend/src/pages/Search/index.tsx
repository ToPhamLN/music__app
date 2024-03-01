import React from 'react'
import { Playlist } from '~/components/features'
import style from '~/styles/Search.module.css'
import { useSearchParams } from 'react-router-dom'
import OldKey from './OldKey'
import All from './All'
import Albums from './Albums'
import Playlists from './Playlists'
import Artists from './Artists'
import Users from './Users'
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const filter = searchParams.get('filter') ?? ''

  const filterHandler = (value: string) => {
    const query = Object.fromEntries(searchParams.entries())
    query.filter = value
    setSearchParams(query)
  }
  return (
    <div className={style.search}>
      <div className={style.filter}>
        <button
          onClick={() => filterHandler('')}
          className={filter == '' ? style.active : ''}
        >
          Tất cả
        </button>
        <button
          onClick={() => filterHandler('songs')}
          className={filter == 'songs' ? style.active : ''}
        >
          Bài hát
        </button>
        <button
          onClick={() => filterHandler('albums')}
          className={filter == 'albums' ? style.active : ''}
        >
          Bộ sưu tập
        </button>
        <button
          onClick={() => filterHandler('playlists')}
          className={
            filter == 'playlists' ? style.active : ''
          }
        >
          Danh sách phát
        </button>
        <button
          onClick={() => filterHandler('artists')}
          className={
            filter == 'artists' ? style.active : ''
          }
        >
          Nghệ sĩ
        </button>
        <button
          onClick={() => filterHandler('users')}
          className={filter == 'users' ? style.active : ''}
        >
          Người dùng
        </button>
      </div>
      {q == '' ? (
        <OldKey />
      ) : (
        <React.Fragment>
          {filter == '' && <All />}
          {filter == 'songs' && (
            <div className={style.map}>
              <h1>Bài hát</h1>
              <Playlist />
            </div>
          )}
          {filter == 'albums' && <Albums />}
          {filter == 'playlists' && <Playlists />}
          {filter == 'artists' && <Artists />}
          {filter == 'users' && <Users />}
        </React.Fragment>
      )}
    </div>
  )
}

export default Search
