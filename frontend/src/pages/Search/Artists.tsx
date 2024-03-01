import React from 'react'
import { CardPeople } from '~/components/features'
import style from '~/styles/Card.module.css'
const Artists = () => {
  return (
    <div className={style.map}>
      <h1>Nghệ sĩ</h1>
      <div className={style.grid}>
        <CardPeople />
        <CardPeople />
        <CardPeople />
        <CardPeople />
        <CardPeople />
        <CardPeople />
        <CardPeople />
        <CardPeople />
      </div>
    </div>
  )
}

export default Artists
