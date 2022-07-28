import { configureStore } from '@reduxjs/toolkit'
import { changeName, changeEmail, changePhoneNum, changePassword } from './redux/user'

// redux store
const store = configureStore({
    reducer: {
      changeName,
      changeEmail,
      changePhoneNum,
      changePassword
    },
});

export default store