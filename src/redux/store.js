import { configureStore, createSlice } from '@reduxjs/toolkit';

let userInfo = createSlice({
    name : 'userInfo',
    initialState : {
        email : 'user@example.com',
        password : 'password'
    },
    reducers : {
      update(state, a){
        state.email = a.payload.email
        state.password = a.password.password
      }
    }
})

export default userInfo;