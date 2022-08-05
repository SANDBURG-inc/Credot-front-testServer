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

export default configureStore({
  reducer: {
    isLogin : isLogin.reducer
  }
}) 

export let { update } = isLogin.actions


export const isLoginSelector = createSelector(
  state => state.isLogin,
  (isLogin) => {
    console.log("isLogin : ");
    return {isLogin};
  }
)