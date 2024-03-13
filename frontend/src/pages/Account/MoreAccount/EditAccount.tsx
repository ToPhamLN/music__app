import React from 'react'
import { InputBox } from '~/components/common'

interface Props {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}
const EditAccount = (props: Props) => {
  const { setEdit } = props
  const editHanler = () => {
    setEdit((p) => !p)
  }
  return (
    <React.Fragment>
      <InputBox />
      <InputBox />
      <InputBox />
      <InputBox />
      <button onClick={editHanler}> Oke </button>
    </React.Fragment>
  )
}

export default EditAccount
