import React, { useEffect, useState, useRef } from 'react'
import style from '~/styles/ArtistCreateTrack.module.css'
import { FormProvider, useForm } from 'react-hook-form'
import Selector from './Selector'
import {
  InputBox,
  InputFile,
  TextBox
} from '~/components/common'
import { LoadingIcon } from '~/components/pure'
import { MdOutlineLibraryAddCheck } from 'react-icons/md'

interface FormTrack {
  album?: string
  title?: string
  photo?: string | File
  source?: File | string
  duration: number
  lyrics: string
}

const ArtistCreateTrack: React.FC = () => {
  const methods = useForm<FormTrack>()
  const [loading, setLoading] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const src = methods.watch('source')

  const onSubmit = async (data: FormTrack) => {
    const album = methods.getValues().album
    if (!album) {
      methods.setError('album', {
        type: 'required'
      })
      return
    }
    try {
      console.log('data', data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio && src) {
      const onLoadedMetadata = () => {
        methods.setValue('duration', audio.duration)
      }
      audio.addEventListener(
        'loadedmetadata',
        onLoadedMetadata
      )
      return () => {
        audio.removeEventListener(
          'loadedmetadata',
          onLoadedMetadata
        )
      }
    }
  }, [src])

  return (
    <div className={style.create__track}>
      <FormProvider {...methods}>
        <form
          className={style.form}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className={style.title}>Tạo Bài Hát Mới</div>
          <Selector />
          <InputFile
            label='Ảnh'
            name='photo'
            accept='image/*'
            required={true}
          />
          <InputBox
            label='Tên bài hát'
            name='title'
            type='text'
          />
          <InputFile
            label='Nhạc'
            name='source'
            accept='audio/*'
            required={true}
          />
          {src && (
            <>
              <audio controls ref={audioRef}>
                <source
                  src={URL.createObjectURL(src)}
                  type='audio/mpeg'
                />
                <track
                  kind='captions'
                  label='English'
                  srcLang='en'
                />
              </audio>
              <TextBox label='Lời bài hát' name='lyrics' />
            </>
          )}
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

export default ArtistCreateTrack
