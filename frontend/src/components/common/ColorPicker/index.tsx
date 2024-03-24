import style from '~/styles/InputBox.module.css'
import { useFormContext } from 'react-hook-form'

interface Props {
  label: string
  name: string
}

const InputBox = ({ label, name }: Props) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div className={style.container}>
      <div
        className={`${style.input__box} ${style.input__color}`}
      >
        {' '}
        <label htmlFor={name}>{label}</label>
        <input
          type={'color'}
          id={name}
          autoComplete='off'
          {...register(name, {
            required: true
          })}
        />
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

export default InputBox
