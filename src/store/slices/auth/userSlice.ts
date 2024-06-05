import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

// export type UserState = {
//     avatar?: string
//     userName?: string
//     email?: string
//     authority?: string[]
// }

export type UserState = {
    email: string
    avatar: string
}

const initialState: UserState = {
    email: '',
    avatar: '',
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.email = action.payload?.email
            state.avatar = action.payload?.avatar
        },

        setAvatar(state, action: PayloadAction<string>) {
            state.avatar = action.payload
        },
    },
})

export const { setUser, setAvatar } = userSlice.actions
export default userSlice.reducer
