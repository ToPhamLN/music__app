import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

const initialState: GlobalSliceType = {
  view: {
    isView: false,
    isRecently: false
  },
  isSidebar: false
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsView: (state, action: PayloadAction<boolean>) => {
      state.view.isView = action.payload
    },
    setIsRecently: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.view.isRecently = action.payload
    },
    setIsSidebar: (state) => {
      state.isSidebar = !state.isSidebar
    }
  }
})

export const { setIsView, setIsRecently, setIsSidebar } =
  globalSlice.actions

export default globalSlice.reducer
