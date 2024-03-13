import React from 'react'
import { ViewInput } from '~/components/common'
interface Props {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}
const AccountDetails = (props: Props) => {
  const { setEdit } = props

  return (
    <React.Fragment>
      <ViewInput />
      <ViewInput />
      <button onClick={() => setEdit((p) => !p)}>
        Sửa đổi tài khoản
      </button>
    </React.Fragment>
  )
}

export default AccountDetails
