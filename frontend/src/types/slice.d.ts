import { DImage, DTrack } from './data'
interface IProfile {
  _id?: string
  email?: string
  accessToken?: string
  role?: string
  idRole?: {
    _id: string
    username: string
    avatar: DImage
    background: DImage
    slug: string
  }
}

interface SettingsSliceType {
  theme: boolean
}

interface IArtistType {
  name: string
}

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
  waitingList: DTrack[]
  list: DTrack[]
  track: DTrack
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
