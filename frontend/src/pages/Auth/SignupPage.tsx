import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import style from '~/styles/Login.module.css'
import { InputBox } from '~/components/common'
import { Link } from 'react-router-dom'
import axios from '~/api/axios'

interface SignupForm {
  email: string
  password: string
  confirmPwd: string
}

const SignupPage: React.FC = () => {
  const methods = useForm()

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
      const res = await axios.post(
        'api/v1/auths/signup',
        data
      )
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={style.login}>
      <FormProvider {...methods}>
        <form
          className={style.container}
          onSubmit={methods.handleSubmit(onSubmit)}
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
            Đăng ký
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
