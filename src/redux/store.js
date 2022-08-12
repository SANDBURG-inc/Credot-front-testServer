import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

const HOST = createSlice({
  name: "HOST",
  initialState: "http://localhost:9000",
  // initialState: "http://3.38.232.237:9000",
});

const isLogin = createSlice({
  name: "isLogin",
  initialState: false,
  reducers: {
    update(state) {
      return !state;
    },
  },
});

const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    name: "",
    email: "",
    phoneNum: "",
    bank: "",
    account: "",
  },
  reducers: {
    updateUserName(state, value) {
      state.name = value.payload;
    },
    updateUserEmail(state, value) {
      state.email = value.payload;
    },
    updateUserPhoneNum(state, value) {
      state.phoneNum = value.payload;
    },
    updateUserBank(state, value) {
      state.bank = value.payload;
    },
    updateUserAccount(state, value) {
      state.account = value.payload;
    },
    removeUserInfo() {
      return {
        name: "",
        email: "",
        phoneNum: "",
        bank: "",
        account: "",
      };
    },
  },
});

// eslint-disable-next-line no-unused-vars
// let password = createSlice({
//   name: 'password',
//   initialState: '',
//   reducers: {
//     updatePassword(state, value) {
//       return value.payload
//     }
//   }
// })

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["token"],
};

const rootReducer = combineReducers({
  login: isLogin.reducer,
  info: userInfo.reducer,
  HOST: HOST.reducer,
  // pw: password.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // eslint-disable-next-line no-dupe-keys
      serializableCheck: false,
    }).concat(logger),
  // }),
});

export default store;

export const { update } = isLogin.actions;
export const { updateUserName, updateUserEmail, updateUserPhoneNum, updateUserBank, updateUserAccount } = userInfo.actions;
// export let { updatePassword } = password.actions;
