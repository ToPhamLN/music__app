import React, { useState } from 'react'
import style from '~/styles/Role.module.css'
import { GrNext, GrPrevious } from 'react-icons/gr'
import ChooseRole from './ChooseRole'
import AboutNewMe from './AboutNewMe'
import { FormProvider, useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import { useAxiosPrivate } from '~/hooks'
import { LoadingIcon } from '~/components/common'
import { useAppDispatch } from '~/hooks'
import { updateProfile } from '~/reduxStore/profileSlice'

interface FormData {
  role: string
  username: string
  avatar?: File
}
const RolePage: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const methods = useForm<FormData>()
  const axios = useAxiosPrivate()
  const dispatch = useAppDispatch()

  const handlePrev = () => {
    if (step > 1) {
      setStep((p) => p - 1)
    }
  }
  const handleNext = () => {
    const role = methods.getValues().role
    if (!role) {
      methods.setError('role', {
        type: 'required'
      })
      return
    }
    if (step < 2) {
      setStep((p) => p + 1)
    }
  }
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const res1 = await axios.put('api/v1/auths/update', {
        role: data.role
      })
      console.log(res1.data)
      const res2 = await axios.post(
        'api/v1/artists/create',
        {
          username: data.username,
          avatar: data.avatar
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      const profilePlain = {
        avatar: res2.data.artist.avatar,
        username: res2.data.artist.username,
        idRole: res2.data.artist._id
      }
      dispatch(updateProfile(profilePlain))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <FormProvider {...methods}>
      <form
        className={style.role}
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{ opacity: loading ? '0.8' : 'unset' }}
      >
        <div className={style.container}>
          {step === 1 && <ChooseRole />}
          {step === 2 && <AboutNewMe />}
          <div className={style.step}>
            <div className={style.btn} onClick={handlePrev}>
              <GrPrevious />
            </div>
            {step === 2 ? (
              <button
                className={`${style.btn} ${style.success__btn}`}
                onClick={handleNext}
              >
                {loading ? <LoadingIcon /> : <FaCheck />}
              </button>
            ) : (
              <div
                className={style.btn}
                onClick={handleNext}
              >
                <GrNext />
              </div>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default RolePage
