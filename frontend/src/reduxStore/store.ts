import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import settingsSlice from './settingsSlice'
import trackPlaySlice from './trackPlaySlice'
import globalSlice from './globalSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    settings: settingsSlice,
    trackPlay: trackPlaySlice,
    global: globalSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
