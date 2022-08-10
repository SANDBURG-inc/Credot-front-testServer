import { configureStore, createSlice, createSelector, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

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
    updateUserName(state,a) {
      state.name = a.payload
    },
    updateUserEmail(state,a) {
      state.email = a.payload
    },
    updateUserPhoneNum(state,a) {
      state.phoneNum = a.payload
    },
    updateUserBank(state,a) {
      state.bank = a.payload
    },
    updateUserAccount(state,a) {
      state.account = a.payload
    },
    removeUserInfo() {
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

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  login: isLogin.reducer,
  info: userInfo.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      serializableCheck: false,
            }).concat(logger),
    // }),
})

export default store;

export let { update } = isLogin.actions;
export let { updateUserName,updateUserEmail,updateUserPhoneNum,updateUserBank,updateUserAccount } = userInfo.actions;