import { createSlice } from '@reduxjs/toolkit'

let userSlice = createSlice({
    name : 'user',
    initialState : {
        name: '',
        email: '',
        phoneNum: '',
        password: '',
    },
    reducers: {
        changeName: (state, ...rest) => {
            return {
                name: rest,
            }
        },
        changeEmail: (state, ...rest) => {
            return {
                email: rest,
            }
        },
        changePhoneNum: (state, ...rest) => {
            return {
                phoneNum: rest,
            }
        },
        changePassword: (state, ...rest) => {
            return {
                password: rest,
            }
        },
    }
})

export let { changeName, changeEmail, changePhoneNum, changePassword } = userSlice.actions

export default userSlice.reducer