import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import style from '~/styles/Home.module.css'
import { useHover } from '~/hooks'
import { TrackAnimation } from '~/components/common'
import { FaPlay } from 'react-icons/fa'

const SlickFramer = () => {
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
  )
}

export default SlickFramer

const Child = () => {
  return (
    <motion.div className={style.child}>
      <div className={style.title}>
        <div className={style.image}>
          <img
            src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
            alt='Image Playlist'
          />
        </div>
        <div className={style.song__animation}>
          <TrackAnimation />
        </div>
        <div className={style.song__play}>
          <button>
            <FaPlay />
          </button>
        </div>
      </div>
      <div className={style.playlist__name}>
        <Link to={'/playlist'}>
          playlist name ttt tt tt
        </Link>
      </div>
      <div className={style.playlist__artist}>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
        <Link> toos ptt</Link>
      </div>
    </motion.div>
  )
}
