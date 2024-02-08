import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: GlobalSliceType = {
  view: {
    isView: false,
    isRecently: false
  }
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsView: (state, action: PayloadAction<boolean>) => {
      state.view.isView = action.payload
    },
    setIsRecently: (state, action: PayloadAction<boolean>) => {
      state.view.isRecently = action.payload
    }
  }
})

export const { setIsView, setIsRecently } = globalSlice.actions

export default globalSlice.reducer
