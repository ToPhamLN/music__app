export const reverseSuffle = (arr: PlayListType) => {
  if (arr.length <= 1) {
    return arr
  }
  const [firstElement, ...rest] = arr
  const shuffledArray = [...rest].sort(() => Math.random() - 0.5)
  shuffledArray.unshift(firstElement)

  return shuffledArray
}

export const sortPlayList = (
  index: number,
  arr: PlayListType
) => {
  const firstPart: PlayListType = arr.slice(0, index)
  const lastPart: PlayListType = arr.slice(index)

  const result: PlayListType = lastPart.concat(firstPart)

  return result
}

export const findTrack = (item: string, arr: PlayListType) => {
  return arr.findIndex((song) => song.name === item)
}
