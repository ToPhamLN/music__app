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

const ArtistCreateAlbum: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const methods = useForm<FormAlbum>({
    resolver: yupResolver(
      schema
    ) as unknown as Resolver<FormAlbum>
  })
  const axios = useAxiosPrivate()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: FormAlbum) => {
    try {
      setLoading(true)
      const res = await axios.post(
        '/api/v1/listtracks/create',
        { ...data, category: ECategory.ALBUM },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      dispatch(
        setNotify({
          type: 'success',
          message: res.data.message
        })
      )
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
          <div className={style.title}>Tạo Album Mới</div>
          <InputBox
            label='Tiêu đề'
            name='title'
            type='text'
          />
          <InputFile
            label='Ảnh tiêu đề'
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

export default ArtistCreateAlbum
