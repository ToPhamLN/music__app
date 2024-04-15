import React, { useState } from 'react'
import {
  ColorPicker,
  InputBox,
  InputFile,
  TextBox
} from '~/components/common'
import { LoadingIcon } from '~/components/pure'
import style from '~/styles/ArtistCreateAlbum.module.css'
import {
  useForm,
  FormProvider,
  Resolver
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MdOutlineLibraryAddCheck } from 'react-icons/md'
import { useAppDispatch, useAxiosPrivate } from '~/hooks'
import { setNotify } from '~/reduxStore/globalSlice'
import { ECategory } from '~/constants/enum'
import { useParams } from 'react-router-dom'
import { DListTrack } from '~/types/data'

interface FormAlbum {
  title: string
  photo: File | string
  background: string
  description: string
}

const schema = yup.object().shape({
  title: yup.string().required('Vui lòng nhập tiêu đề.'),
  photo: yup
    .mixed()
    .required('Vui lòng tải ảnh lên.')
    .nullable(),
  background: yup
    .string()
    .required('Vui lòng nhập màu nền.'),
  description: yup.string().required('Vui lòng nhập mô tả.')
})

const ArtistAlbumUpdate: React.FC = () => {
  const idAlbum = useParams().albumParam?.slice(-29, -5)
  const [loading, setLoading] = useState<boolean>(false)
  const methods = useForm<FormAlbum>({
    defaultValues: async () => {
      try {
        const apiEndpoint = `/api/v1/listtracks/${idAlbum}`
        const res = await axios.get(apiEndpoint)
        const { photo, ...other } = res.data as DListTrack
        console.log(photo)
        res.data as DListTrack
        return other as DListTrack
      } catch (error) {
        console.log(error)
        return {} as DListTrack
      }
    },
    resolver: yupResolver(
      schema
    ) as unknown as Resolver<FormAlbum>
  })
  const axios = useAxiosPrivate()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: FormAlbum) => {
    try {
      setLoading(true)
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={style.create__album}>
      <FormProvider {...methods}>
        <form
          className={style.form}
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ opacity: loading ? '0.8' : 'unset' }}
        >
          <div className={style.title}>Sửa đổi Album</div>
          <InputBox
            label='Tiêu đề'
            name='title'
            type='text'
          />
          <InputFile
            label='Thay đổi Ảnh tiêu đề'
            name='photo'
            accept='image/*'
          />

          <ColorPicker
            name='background'
            label={'Màu nền'}
          />
          <TextBox label='Mô tả' name='description' />
          <button>
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
  )
}

export default ArtistAlbumUpdate
