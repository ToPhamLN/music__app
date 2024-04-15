import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { MdOutlineLibraryAddCheck } from 'react-icons/md'
import { InputBox, InputFile } from '~/components/common'
import { LoadingIcon } from '~/components/pure'
import { useAxiosPrivate } from '~/hooks'
import style from '~/styles/ArtistDetails.module.css'
import { DArtist, DImage } from '~/types/data'

interface Props {
  setExit: React.Dispatch<React.SetStateAction<boolean>>
  artist: DArtist
}
interface FormArtist {
  username?: string
  avatar?: File
  background?: File
  avatarOld?: DImage
  backgroundOld?: DImage
}

const UpdateArtist = ({ setExit, artist }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const methods = useForm()
  const axios = useAxiosPrivate()

  const onSubmit = async (data: FormArtist) => {
    const formData = new FormData()
    if (data?.username)
      formData.append('username', data?.username)

    try {
      setLoading(true)
      console.log(data)
      const res = await axios.put(
        `api/v1/artists/update`,
        formData,
        { headers: { 'Content-Type': 'multipart/form' } }
      )
      console.log(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const formArtist: FormArtist = {
      username: artist?.username,
      avatarOld: artist?.avatar,
      backgroundOld: artist?.background
    }
    methods.reset(formArtist)
  }, [artist])

  return (
    <div className={style.fixed__container}>
      <div className={style.update__artist}>
        <button
          className={style.exit}
          type='button'
          onClick={() => setExit((p) => !p)}
        >
          X
        </button>
        <h2>Cập nhập trang cá nhân</h2>
        <div className={style.form}>
          <FormProvider {...methods}>
            <form
              className={style.form__container}
              onSubmit={methods.handleSubmit(onSubmit)}
              style={{ opacity: loading ? '0.8' : 'unset' }}
            >
              <InputBox
                label='Tên nghệ sĩ'
                name='username'
                type='text'
              />
              <InputFile
                label='Ảnh đại diện'
                name='avatar'
                accept='image/*'
              />{' '}
              <InputFile
                label='Ảnh nền'
                name='background'
                accept='image/*'
              />
              <button className={style.submit}>
                {loading ? (
                  <LoadingIcon />
                ) : (
                  <>
                    <MdOutlineLibraryAddCheck />
                    Tạo
                  </>
                )}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default UpdateArtist
