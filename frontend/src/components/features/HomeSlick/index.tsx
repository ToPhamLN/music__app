import React, { useRef } from 'react'
import { GrNext, GrPrevious } from 'react-icons/gr'
import Slider, { Settings } from 'react-slick'
import style from '~/styles/ArtistAlbum.module.css'

const HomeSlick: React.FC = () => {
  const slideRef = useRef<Slider | null>(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  } as Settings

  const prev = () => {
    const slick = slideRef.current
    if (slick) {
      slick.slickPrev()
    }
  }

  const next = () => {
    const slick = slideRef.current
    if (slick) {
      slick.slickNext()
    }
  }
  const lists = [1, 2, 3, 4, 6, 7]
  return (
    <div className={style.slider}>
      <Slider ref={slideRef} {...settings}>
        {lists.map((slider) => (
          <Child key={slider} />
        ))}
      </Slider>
      <button
        className={style.btn__prev}
        onClick={() => prev()}
      >
        <GrPrevious />
      </button>
      <button
        className={style.btn__next}
        onClick={() => next()}
      >
        <GrNext />
      </button>
    </div>
  )
}

export default HomeSlick

const Child = () => {
  return (
    <div className={style.item__slider}>
      <img
        src='https://res.cloudinary.com/dohywtebw/image/upload/v1694691530/blog-app/tehprwmyyyiukuoojo7k.jpg'
        alt='Poster Playlist'
      />
    </div>
  )
}
