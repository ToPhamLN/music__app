import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { userInfo: UserInfoType } = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(window.localStorage.getItem('userInfo')!)
    : null!
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserInfoType>) => {
      state.userInfo = action.payload
      localStorage.setItem(
        'userInfo',
        JSON.stringify(action.payload)
      )
    },
    logoutUser: (state) => {
      state.userInfo = null!
      localStorage.removeItem('userInfo')
    }
  }
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
