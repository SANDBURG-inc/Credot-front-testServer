import { configureStore, createSlice, createSelector } from '@reduxjs/toolkit';

let isLogin = createSlice({
    name : 'isLogin',
    initialState : false,
    reducers : {
      update(state) {
        return !state
      }
    }
})

let userInfo = createSlice({
  name : 'userInfo',
  initialState : {
    name: '',
    email: '',
    phoneNum: '',
    bank: '',
    account: '',
  },
  reducers : {
    updateUserInfo(state) {
      return {
        name: '',
        email: '',
        phoneNum: '',
        bank: '',
        account: '',
      }
    }
  }
})

export default configureStore({
  reducer: {
    isLogin : isLogin.reducer,
    userInfo : userInfo.reducer
  }
}) 

export let { update, updateUserInfo } = isLogin.actions


export const isLoginSelector = createSelector(
  state => state.isLogin,
  (isLogin) => {
    console.log("isLogin : ");
    return {isLogin};
  }
)