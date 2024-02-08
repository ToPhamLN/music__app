interface UserInfoType {
  username: string
  email: string
}

interface UserSliceType {
  userInfo: UserInfoType
}

interface SettingsSliceType {
  theme: boolean
}

interface ArtistType {
  name: string
}

interface TrackType {
  name: string
  src: {
    path: string
    filename: string
  }
  artist: ArtistType
  // lyrics: {
  //   time: number
  //   text: string
  // }
  // duration: number
}

interface PlayListType extends Array<TrackType> {}

interface VolumeType {
  isMute: boolean
  value: number
}

interface ModeTrackPlay {
  isLoop: boolean
  isReplay: boolean
  isSuffle: boolean
}

interface TrackPlaySliceType {
  waitingList: PlayListType
  list: PlayListType
  track: TrackType
  volume: VolumeType
  currentTime: number
  mode: ModeTrackPlay
  isPlaying: boolean
}

interface GlobalSliceType {
  view: {
    isView: boolean
    isRecently: boolean
  }
}
