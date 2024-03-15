/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

const initialState: SProfile = localStorage.getItem(
  'profile'
)
  ? JSON.parse(localStorage.getItem('profile')!)
  : {}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<SProfile>
    ) => {
      state = action.payload
      localStorage.setItem('profile', JSON.stringify(state))
    },
    updateProfile: (
      state,
      action: PayloadAction<SProfile>
    ) => {
      state = { ...state, ...action.payload }
      localStorage.setItem('profile', JSON.stringify(state))
    },
    deleteProfile: (state) => {
      state = {}
      localStorage.removeItem('profile')
    }
  }
})

export const { setProfile, updateProfile, deleteProfile } =
  profileSlice.actions
export default profileSlice.reducer
