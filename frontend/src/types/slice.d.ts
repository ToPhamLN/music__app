interface IProfile {
  _id?: string
  email?: string
  accessToken?: string
  role?: string
  idRole?: {
    _id: string
    username: string
    avatar: DImage
  }
}

interface SettingsSliceType {
  theme: boolean
}

interface IArtistType {
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

interface SNotification {
  type: string
  message: string
}

interface GlobalSliceType {
  view: {
    isView: boolean
    isRecently: boolean
  }
  isSidebar: boolean
  notify: SNotification[]
}
