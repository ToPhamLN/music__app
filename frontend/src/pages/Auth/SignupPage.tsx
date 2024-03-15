import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import style from '~/styles/Login.module.css'
import { InputBox, LoadingIcon } from '~/components/common'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAxiosPublic } from '~/hooks'
import { setProfile } from '~/reduxStore/profileSlice'
import { setNotify } from '~/reduxStore/globalSlice'

interface SignupForm {
  email: string
  password: string
  confirmPwd: string
}

const SignupPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const methods = useForm<SignupForm>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const axiosPublic = useAxiosPublic()

  const onSubmit = async (data: SignupForm) => {
    if (data.password !== data.confirmPwd) {
      methods.setError('confirmPwd', {
        type: 'manual',
        message:
          'Xác nhận mật khẩu không trùng với mật khẩu'
      })
      return
    }
    try {
      setLoading(true)
      const res = await axiosPublic.post(
        'api/v1/auths/signup',
        data
      )
      dispatch(setProfile(res.data.auth))
      dispatch(
        setNotify({
          type: 'success',
          message: res.data.message
        })
      )
      navigate('/role')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={style.login}>
      <FormProvider {...methods}>
        <form
          className={style.container}
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ opacity: loading ? '0.8' : 'unset' }}
        >
          <h1>Đăng ký tham gia Morri</h1>
          <div className={style.stripe}></div>
          <div className={style.login__account}>
            <InputBox
              label='Email'
              name='email'
              type='text'
            />
            <InputBox
              label='Mật khẩu'
              name='password'
              type='password'
            />
            <InputBox
              label='Xác nhận mật khẩu'
              name='confirmPwd'
              type='password'
            />
          </div>
          <button className={style.submit} type='submit'>
            {loading ? <LoadingIcon /> : 'Đăng ký'}
          </button>

          <div className={style.stripe}></div>
          <div className={style.reminder}>
            Đã có tài khoản?
            <Link to={'/login'}>Đăng nhập</Link>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default SignupPage
