import React from 'react'
import style from '~/styles/Home.module.css'
import Child from './Child'
interface Props {
  setExit: React.Dispatch<React.SetStateAction<boolean>>
}
const Section = (props: Props) => {
  const { setExit } = props
  return (
    <div className={style.section__playlistrow}>
      <div className={style.container}>
        <button
          className={style.exit}
          onClick={() => setExit(false)}
        >
          X
        </button>
        <h1>Dành cho bạn</h1>
        <div className={style.wrapper}>
          <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child /> <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child /> <Child />
          <Child />
          <Child />
          <Child />
          <Child />
          <Child /> <Child />
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

export default Section
