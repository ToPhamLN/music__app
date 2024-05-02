import React from 'react'
import { EGenre } from '~/constants/enum'
import style from '~/styles/Topic.module.css'

const GenrePage = () => {
  return (
    <div className={style.topic}>
      <div className={style.map}>
        <h1>Tất cả chủ đề</h1>
        <div className={style.parent}>
          {Object.keys(EGenre).map((genre, index) => (
            <Child
              key={index}
              genre={EGenre[genre as keyof typeof EGenre]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GenrePage

const Child = ({ genre }: { genre: string }) => {
  return (
    <div className={style.child}>
      <div className={style.image}>
        <img
          src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
          alt=''
        />
      </div>
      <div className={style.title}>
        <h1>{genre}</h1>
      </div>
    </div>
  )
}
