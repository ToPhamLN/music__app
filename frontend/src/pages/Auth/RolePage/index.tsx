import React, { useState } from 'react'
import style from '~/styles/Role.module.css'
import { GrNext, GrPrevious } from 'react-icons/gr'
import ChooseRole from './ChooseRole'
import AboutNewMe from './AboutNewMe'
import { FormProvider, useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'

interface FormData {
  role: string
  name: string
  avatar?: File
}
const RolePage: React.FC = () => {
  const [step, setStep] = useState(1)
  const methods = useForm<FormData>()
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
  const onSubmit = (data: FormData) => {
    console.log(data.avatar)
  }
  return (
    <FormProvider {...methods}>
      <form
        className={style.role}
        onSubmit={methods.handleSubmit(onSubmit)}
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
                <FaCheck />
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
