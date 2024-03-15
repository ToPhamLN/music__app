import React from 'react'
import {
  InputBox,
  InputFile,
  TextBox
} from '~/components/common'
import style from '~/styles/AritstCreateAlbum.module.css'
import { useForm, FormProvider } from 'react-hook-form'
import { MdOutlineLibraryAddCheck } from 'react-icons/md'
import { useAppDispatch, useAxiosPrivate } from '~/hooks'
import { setNotify } from '~/reduxStore/globalSlice'

interface FormAlbum {
  title: string
  photo: string
  background: string
  description: string
}
const ArtistCreateAlbum: React.FC = () => {
  const methods = useForm<FormAlbum>()
  const axiosPrivate = useAxiosPrivate()

  const onSubmit = async (data: FormAlbum) => {
    try {
      const res = await axiosPrivate.post(
        'api/v1/listtrack/create',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.create__album}>
      <FormProvider {...methods}>
        <form
          className={style.form}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className={style.title}>Tạo Album Mới</div>
          <InputBox
            label='Tiêu đề'
            name='title'
            type='text'
          />
          <InputFile
            label='Ảnh tiêu đề'
            name='photo'
            required={true}
          />
          <InputFile
            label='Ảnh nền'
            name='background'
            width='100%'
            required={true}
          />
          <TextBox label='Mô tả' name='description' />
          <button>
            <MdOutlineLibraryAddCheck />
            Tạo
          </button>
        </form>
      </FormProvider>
    </div>
  )
}

export default ArtistCreateAlbum
