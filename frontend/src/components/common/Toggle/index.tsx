import React from 'react'
import style from '~/styles/InputBox.module.css'
const Toggle = () => {
  return (
    <div className={style.toggle}>
      <input type='checkbox' id='switch' />
      <label for='switch'>Toggle</label>
    </div>
  )
}

export default Toggle
