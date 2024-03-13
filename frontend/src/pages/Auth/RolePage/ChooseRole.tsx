import React, { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import style from '~/styles/Role.module.css'

const Role: React.FC = () => {
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors }
  } = useFormContext()
  const handleChooseRole = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValue('role', e.target.value)
    clearErrors('role')
  }
  return (
    <div className={style.role__container}>
      <h1 className={style.title}>Chọn vai trò của bạn</h1>
      <h3 className={style.desc}>
        Lưu ý: Bạn không thể thay đổi sau này
      </h3>
      <div className={style.grid}>
        <label className={style.role__item}>
          <input
            type='radio'
            {...register('role')}
            value='user'
            onChange={handleChooseRole}
          />
          <span className={style.role__name}>
            Người nghe
          </span>
          <img src='/src/assets/user-role.jpg' alt='' />
        </label>
        <label className={style.role__item}>
          <input
            type='radio'
            {...register('role')}
            value='artist'
            onChange={handleChooseRole}
          />
          <span className={style.role__name}>Nghệ sĩ</span>
          <img src='/src/assets/artist-role.jpg' alt='' />
        </label>
      </div>
      {errors.role && (
        <p className={style.error}>
          Bạn phải chọn vai trò của bạn trước!
        </p>
      )}
    </div>
  )
}

export default Role
