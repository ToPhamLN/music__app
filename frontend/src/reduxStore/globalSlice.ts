import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

const initialState: GlobalSliceType = {
  view: {
    isView: false,
    isRecently: false
  },
  isSidebar: false,
  notify: []
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
    },
    setNotify: (
      state,
      action: PayloadAction<SNotification>
    ) => {
      state.notify = [...state.notify, action.payload]
    },
    removeNotify: (
      state,
      action: PayloadAction<SNotification>
    ) => {
      state.notify = state.notify.filter(
        (item) => item.message !== action.payload.message
      )
    }
  }
})

export const {
  setIsView,
  setIsRecently,
  setIsSidebar,
  setNotify,
  removeNotify
} = globalSlice.actions

export default globalSlice.reducer
