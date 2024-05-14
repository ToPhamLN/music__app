import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { DListTrack, DTrack } from '~/types/data'
import {
  ModeTrackPlay,
  TrackPlaySliceType,
  VolumeType
} from '~/types/slice'
import {
  findTrack,
  reverseSuffle,
  sortPlayList
} from '~/utils/array'

const initialState: TrackPlaySliceType =
  localStorage.getItem('trackPlay')
    ? JSON.parse(localStorage.getItem('trackPlay')!)
    : {
        listInfo: null!,
        list: [],
        waitingList: [],
        track: null!,
        volume: {
          isMute: false,
          value: 1
        },
        isPlaying: false,
        currentTime: 0,
        mode: {
          isLoop: false,
          isReplay: false,
          isSuffle: false
        }
      }

const trackPlaySlice = createSlice({
  name: 'TrackPlay',
  initialState,
  reducers: {
    setWaitingList: (
      state,
      action: PayloadAction<DTrack[]>
    ) => {
      state.waitingList = action.payload
      localStorage.setItem(
        'trackPlay',
        JSON.stringify(state)
      )
    },
    addWaitingList: (
      state,
      action: PayloadAction<DTrack>
    ) => {
      const existingIndex = state.waitingList.findIndex(
        (item) => item._id === action.payload._id
      )
      if (existingIndex !== -1) {
        state.waitingList.splice(existingIndex, 1)
      }
      state.waitingList.splice(1, 0, action.payload)
      localStorage.setItem(
        'trackPlay',
        JSON.stringify(state)
      )
    },
    setList: (state, action: PayloadAction<DTrack[]>) => {
      state.list = action.payload
      const { track, list, mode } = { ...state }
      const indexTrack: number = findTrack(
        track._id as string,
        list
      )
      const newArr = sortPlayList(indexTrack, list)

      let waitingList = [...newArr]

      if (mode.isSuffle) {
        waitingList = reverseSuffle(newArr)
      }
      state.waitingList = waitingList
      localStorage.setItem(
        'trackPlay',
        JSON.stringify(state)
      )
    },
    setListInfo: (
      state,
      action: PayloadAction<DListTrack | undefined>
    ) => {
      state.listInfo = action.payload
      localStorage.setItem(
        'trackPlay',
        JSON.stringify(state)
      )
    },
    setTrack: (state, action: PayloadAction<DTrack>) => {
      state.track = action.payload
      const { track, list, mode } = { ...state }
      const indexTrack: number = findTrack(
        track._id as string,
        list
      )
      const newArr = sortPlayList(indexTrack, list)

      let waitingList = [...newArr]

      if (mode.isSuffle) {
        waitingList = reverseSuffle(newArr)
      }
      state.waitingList = waitingList
      localStorage.setItem(
        'trackPlay',
        JSON.stringify(state)
      )
    },
    setCurrentTime: (
      state,
      action: PayloadAction<number>
    ) => {
      state.currentTime = action.payload
      localStorage.setItem(
        'trackPlay',
        JSON.stringify(state)
      )
    },
    setVolume: (
      state,
      action: PayloadAction<VolumeType>
    ) => {
      state.volume = action.payload
      localStorage.setItem(
        'trackPlay',
        JSON.stringify(state)
      )
    },
    setMode: (
      state,
      action: PayloadAction<ModeTrackPlay>
    ) => {
      state.mode = action.payload
      const { list, mode } = { ...state }
      let waitingList = list
      if (mode.isSuffle) {
        waitingList = reverseSuffle(list)
      }
      state.waitingList = waitingList

      localStorage.setItem(
        'trackPlay',
        JSON.stringify(state)
      )
    },
    setIsPlaying: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isPlaying = action.payload
    }
  }
})

export const {
  setWaitingList,
  addWaitingList,
  setList,
  setTrack,
  setCurrentTime,
  setVolume,
  setMode,
  setIsPlaying,
  setListInfo
} = trackPlaySlice.actions

export default trackPlaySlice.reducer
