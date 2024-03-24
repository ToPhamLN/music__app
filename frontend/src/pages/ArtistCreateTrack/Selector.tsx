import React, { useState, useEffect } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import style from '~/styles/InputBox.module.css'
import { DListTrack } from '~/types/data'
import { useAxiosPrivate } from '~/hooks'
import { IoIosArrowDown } from 'react-icons/io'
import { useFormContext } from 'react-hook-form'
const Selector = () => {
  const [albums, setAlbums] = useState<DListTrack[]>([])
  const [expend, setExpend] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [selected, setSelected] = useState<string>('')

  const axios = useAxiosPrivate()
  const {
    formState: { errors },
    watch,
    setValue,
    clearErrors
  } = useFormContext()

  const handleGetAlbums = async () => {
    try {
      const res = await axios.get(
        'api/v1/listtracks/albumsforartist'
      )
      setAlbums(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    handleGetAlbums()
  }, [])

  const handleChoose = (value: string, name: string) => {
    setValue('album', value)
    clearErrors('album')
    setSelected(name)
    setExpend(false)
  }

  const handleClear = () => {
    setValue('album', '')
    setSelected('')
  }
  return (
    <div className={style.container}>
      <div className={style.selector}>
        <label htmlFor='selector'> Album</label>
        <div className={style.input__box}>
          <div className={style.result}>{selected}</div>
          {watch('album') && (
            <div
              className={style.icon}
              onClick={handleClear}
            >
              <MdOutlineClose />
            </div>
          )}
          <div
            className={style.icon}
            onClick={() => setExpend((p) => !p)}
          >
            <IoIosArrowDown />
          </div>
        </div>
        {expend && (
          <div className={style.wrapper}>
            {albums.map((album) => (
              <div
                className={style.item__selector}
                key={album._id}
                onClick={() =>
                  handleChoose(album._id, album.title)
                }
                role='button'
              >
                {album.title}
              </div>
            ))}
          </div>
        )}
      </div>
      {errors.album &&
        errors.album?.type === 'required' && (
          <p className={style.error}>Album không hợp lệ</p>
        )}
      {errors.artist && errors.album?.type === 'manual' && (
        <p className={style.error}>
          {errors.artist?.message?.toString() ||
            'Đã xảy ra lỗi'}
        </p>
      )}
    </div>
  )
}

export default Selector
