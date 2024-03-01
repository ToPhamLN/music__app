import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import style from '~/styles/Home.module.css'
import Child from './Child'
import Section from './Section'
const SlickFramer = () => {
  const [widthInner, setWithInner] = useState<number>(0)
  const casrouselRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null)
  const [openSection, setOpenSection] =
    useState<boolean>(false)

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
        <button onClick={() => setOpenSection(true)}>
          Xem tất cả
        </button>
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
      {openSection && <Section setExit={setOpenSection} />}
    </div>
  )
}

export default SlickFramer
