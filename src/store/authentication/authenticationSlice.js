import { createSlice } from '@reduxjs/toolkit'
import {JWT} from "@/constanst"

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    [JWT.ACCESS_TOKEN]: '',
    [JWT.REFRESH_TOKEN]: '',
  },
  reducers: {
    saveToken: (state, action) => {
      state[JWT.ACCESS_TOKEN] = action.payload[JWT.ACCESS_TOKEN]
      state[JWT.REFRESH_TOKEN] = action.payload[JWT.REFRESH_TOKEN]
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveToken } = authenticationSlice.actions

export default authenticationSlice.reducer