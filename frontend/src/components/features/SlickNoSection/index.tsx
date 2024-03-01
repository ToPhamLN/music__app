import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import style from '~/styles/Home.module.css'
import Child from './Child'
const SlickNoFramer = () => {
  const [widthInner, setWithInner] = useState<number>(0)
  const casrouselRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null)

  useEffect(() => {
    const casrousel = casrouselRef.current
    if (casrousel) {
      setWithInner(
        casrousel.scrollWidth - casrousel.offsetWidth
      )
    }
  }, [])
  return (
    <div className={style.playlist__row}>
      <div className={style.header}>
        <h1>Dành cho bạn</h1>
        <button>Xem tất cả</button>
      </div>
      <motion.div
        ref={casrouselRef}
        className={style.carousel}
      >
        <motion.div
          drag='x'
          dragConstraints={{ right: 0, left: -widthInner }}
          className={style.inner__carousel}
        >
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
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SlickNoFramer
