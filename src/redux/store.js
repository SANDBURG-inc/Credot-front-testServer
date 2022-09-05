import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

// const HOST = createSlice({
//   name: "HOST",
//   // initialState: "http://localhost:9000",
//   initialState: "http://3.38.232.237:9000",
// });

var HOST = "http://3.38.232.237:9000";
// var HOST = "http://localhost:9000";

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

const incInfo = createSlice({
  name: "incInfo",
  initialState: {
    corporateName: "",
    ceo: "",
    businessLoc: "",
    corporateNum: "",
  },
  reducers: {
    updateCorporateName(state, value) {
      state.corporateName = value.payload;
    },
    updateCeo(state, value) {
      state.ceo = value.payload;
    },
    updateBusinessLoc(state, value) {
      state.businessLoc = value.payload;
    },
    updateCorporateNum(state, value) {
      state.corporateNum = value.payload;
    },
  },
});

const financeHistory = createSlice({
  name: "financeHistory",
  // initialState: {
  //   contractDate: "",
  //   deadline: "",
  //   ammount: "",
  //   commerce: "",
  //   status: "",
  // },
  // reducers: {
  //   updateContractDate(state, value) {
  //     state.contractDate = value.payload;
  //   },
  //   updateDeadline(state, value) {
  //     state.deadline = value.payload;
  //   },
  //   updateAmmount(state, value) {
  //     state.ammount = value.payload;
  //   },
  //   updateCommerce(state, value) {
  //     state.commerce = value.payload;
  //   },
  //   updateStatus(state, value) {
  //     state.status = value.payload;
  //   },
  // },
  initialState: [],
  reducers: {
    updateFinanceHistory(state, value) {
      state = value;
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
  incInfo: incInfo.reducer,
  financeHistory: financeHistory.reducer,
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
export const { updateCorporateName, updateCeo, updateBusinessLoc, updateCorporateNum } = incInfo.actions;
// export const { updateContractDate, updateDeadline, updateAmmount, updateCommerce, updateStatus } = financeInfo.actions;
export const { updateFinanceHistory } = financeHistory.actions;
export { HOST };
// export let { updatePassword } = password.actions;
