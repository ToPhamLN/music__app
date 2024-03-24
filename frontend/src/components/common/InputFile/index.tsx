import style from '~/styles/InputBox.module.css'
import { useFormContext, Controller } from 'react-hook-form'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineClose } from 'react-icons/md'
import { Disc } from '~/components/pure'

interface Props {
  label: string
  name: string
  width?: string
  accept: string
  required?: boolean
}

const InputFile = ({
  label,
  name,
  width,
  accept,
  required
}: Props) => {
  const {
    formState: { errors },
    setValue,
    watch,
    control
  } = useFormContext()

  const src = watch(name)
  return (
    <div className={style.container}>
      <div
        className={style.input__file}
        style={{ width: width }}
      >
        {src ? (
          <>
            {accept == 'image/*' ? (
              <img src={URL.createObjectURL(src)} alt='' />
            ) : (
              <Disc />
            )}

            <div
              className={style.delete__image}
              role='button'
              onClick={() => setValue(name, '')}
            >
              <MdOutlineClose />
            </div>
            <h1 className={style.filename}>{src?.name}</h1>
          </>
        ) : (
          <div className={style.change__file}>
            <label htmlFor={name}>
              <AiOutlinePlus />
              {label}
            </label>
            <Controller
              name={name}
              control={control}
              rules={{ required: required }}
              render={({ field }) => (
                <input
                  type='file'
                  accept={accept}
                  id={name}
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.files
                        ? e.target.files[0]
                        : null
                    )
                  }
                />
              )}
            />
          </div>
        )}
      </div>
      {errors[name] &&
        errors[name]?.type === 'required' && (
          <p className={style.error}>
            {label} chưa được thêm
          </p>
        )}
    </div>
  )
}

export default InputFile
