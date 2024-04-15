import { format } from 'date-fns'

export const formatTime = (time: number) => {
  if (time >= 3600) {
    const hours = Math.floor(time / 3600)
    const remainingTime = time - hours * 3600
    const minutes = Math.floor(remainingTime / 60)
    const seconds = Math.floor(remainingTime % 60)
    const formattedSeconds = seconds
      .toString()
      .padStart(2, '0')
    return `${hours}:${minutes}:${formattedSeconds}`
  } else {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const formattedSeconds = seconds
      .toString()
      .padStart(2, '0')
    return `${minutes}:${formattedSeconds}`
  }
}

export const formatDay = (date: string): string => {
  const newDate: Date = new Date(date)
  const formatDay = format(newDate, 'MMM dd, yyyy')
  return formatDay
}
