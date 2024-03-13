import React, { useEffect, useState } from 'react'
import style from '~/styles/Notification.module.css'
import Item from './Item'

const Notification = () => {
  const [items, setItems] = useState<number[]>([1, 2, 3])
  const [removingItem, setRemovingItem] = useState<
    number | null
  >(null)

  useEffect(() => {
    if (items.length > 0) {
      const timer = setTimeout(() => {
        const itemToRemove = items[0]
        setRemovingItem(itemToRemove)

        setTimeout(() => {
          setItems((prevItems) => prevItems.slice(1))
          setRemovingItem(null)
        }, 500)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [items])

  return (
    <div className={style.notification}>
      {items.map((item) => (
        <Item key={item} removing={removingItem} />
      ))}
    </div>
  )
}

export default Notification
