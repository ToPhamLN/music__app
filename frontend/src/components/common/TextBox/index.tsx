import { useState } from 'react'
import {
  MdOutlineClose,
  MdOutlineVisibility,
  MdOutlineVisibilityOff
} from 'react-icons/md'
import style from '~/styles/InputBox.module.css'
import { useFormContext } from 'react-hook-form'

interface Props {
  label: string
  name: string
}

const TextBox = ({ label, name }: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext()
  const [isPasswordVisible, setIsPasswordVisible] =
    useState(false)

  return (
    <div className={style.container}>
      <div
        className={`${style.input__box} ${style.text__box} ${watch(name) ? style.has__value : ''} `}
      >
        <label htmlFor={name}>{label}</label>
        <div
          className={style.show}
          onClick={() =>
            setIsPasswordVisible(!isPasswordVisible)
          }
        >
          {isPasswordVisible ? (
            <MdOutlineVisibility />
          ) : (
            <MdOutlineVisibilityOff />
          )}
        </div>
        <textarea
          id={name}
          autoComplete='off'
          {...register(name, {
            required: true
          })}
        />
        {watch(name) && (
          <div
            className={style.icon}
            onClick={() => setValue(name, '')}
          >
            <MdOutlineClose />
          </div>
        )}
      </div>

      {errors[name] &&
        errors[name]?.type === 'required' && (
          <p className={style.error}>
            {label} không hợp lệ
          </p>
        )}
      {errors[name] && errors[name]?.type === 'manual' && (
        <p className={style.error}>
          {errors[name]?.message?.toString() ||
            'Đã xảy ra lỗi'}
        </p>
      )}
    </div>
  )
}

export default TextBox
