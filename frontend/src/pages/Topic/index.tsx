import React from 'react'
import style from '~/styles/Topic.module.css'

const TopicPage = () => {
  return (
    <div className={style.topic}>
      <div className={style.map}>
        <h1>Tất cả chủ đề</h1>
        <div className={style.parent}>
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
        </div>
      </div>
    </div>
  )
}

export default TopicPage

const Child = () => {
  return (
    <div className={style.child}>
      <div className={style.image}>
        <img
          src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
          alt=''
        />
      </div>
      <div className={style.title}>
        <h1>Name Topic brrr</h1>
      </div>
    </div>
  )
}
