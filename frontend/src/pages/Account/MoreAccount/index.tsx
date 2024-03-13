import React, { useState } from 'react'
import style from '~/styles/Account.module.css'
import AccountDetails from './AccountDetails'
import EditAccount from './EditAccount'

const MoreAccount = () => {
  const [edit, setEdit] = useState<boolean>(false)
  return (
    <div className={style.content}>
      {edit ? (
        <EditAccount setEdit={setEdit} />
      ) : (
        <AccountDetails setEdit={setEdit} />
      )}
    </div>
  )
}

export default MoreAccount
