import { createSlice  , createAsyncThunk} from '@reduxjs/toolkit'
import {JWT} from "@/constanst"
import { LoginService, getProfile } from '../../services/auth'
import { error } from 'jquery';

export const login = createAsyncThunk("login", 
  async ({email, password}, {rejectWithValue}) => {
  try {
    const response = await LoginService(email, password);
    if (response.status != 200) {
      return rejectWithValue(response.data.message);
    }
    const responseProfile = await getProfile(response.data.data[JWT.ACCESS_TOKEN]);
    if (responseProfile.status != 200) {
      return rejectWithValue(response.data.message);
    }
    return {
      [JWT.ACCESS_TOKEN]: response.data.data[JWT.ACCESS_TOKEN],
      [JWT.REFRESH_TOKEN]: response.data.data[JWT.REFRESH_TOKEN],
      name :  responseProfile.data.data.firstName,
      avatarUrl : responseProfile.data.data.avatarUrl,
      email :  responseProfile.data.data.email,
    }
  } catch (error) {
    console.log(error);
    return rejectWithValue('Xảy ra lỗi')
  }
});

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    user: null,
    // user: {
    //   [JWT.ACCESS_TOKEN]: '',
    //   [JWT.REFRESH_TOKEN]: '',
    //   name: 'Admin',
    //   avatarUrl: 'https://github.com/mdo.png',
    //   email: 'admin@gmail.com',
    // },   
  },
  reducers: {
    // saveToken: async (state, action) => {
    //   try {
    //     state[JWT.ACCESS_TOKEN] = action.payload[JWT.ACCESS_TOKEN]
    //     state[JWT.REFRESH_TOKEN] = action.payload[JWT.REFRESH_TOKEN]

    //     const response = await getProfile(action.payload[JWT.ACCESS_TOKEN]);
    //     if (response.status == 200) {
    //       state.name =  response.data.data.firstName;
    //       state.avatarUrl = response.data.data.avatarUrl;
    //       state.email =  response.data.data.email;
    //     }
    //   }
    //   catch(error) {
    //     console.log(error);
    //   }  
    // },
    

     
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
     state.isLoading = true;
    })
    builder.addCase(login.fulfilled, (state, action) => {
     state.isLoading = false;
     state.user = action.payload;
    })
    builder.addCase(login.rejected, (state, action) => {
     state.isError = true;
     state.errorMessage = action.payload;
    })
   }
})

// Action creators are generated for each case reducer function
// export const { saveToken } = authenticationSlice.actions

export default authenticationSlice.reducer