import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: SettingsSliceType = {
  theme: localStorage.getItem('themeMode')
    ? JSON.parse(window.localStorage.getItem('themeMode')!)
    : null!
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<boolean>) => {
      state.theme = action.payload
      localStorage.setItem(
        'themeMode',
        JSON.stringify(action.payload)
      )
    }
  }
})

export const { setThemeMode } = themeSlice.actions
export default themeSlice.reducer
