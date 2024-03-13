import React from 'react'
import {
  InputBox,
  InputFile,
  TextBox
} from '~/components/common'
import style from '~/styles/AritstCreateAlbum.module.css'
import { useForm, FormProvider } from 'react-hook-form'
import { MdOutlineLibraryAddCheck } from 'react-icons/md'

interface FormAlbum {
  title: string
  artwork: string
  background: string
  description: string
}
const ArtistCreateAlbum: React.FC = () => {
  const methods = useForm<FormAlbum>()
  const onSubmit = (data: FormAlbum) => {
    console.log(data) //{title: 'ewqe', artword: FileList, background: FileList, description: 'qwe'}
    console.log(data.artwork) //undefined
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
            name='artwork'
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
