import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export interface SessionState {
    signedIn: boolean
    user: any
    accessToken: string | null
    refreshToken: string | null
}

const initialState: SessionState = {
    signedIn: false,
    user: null,
    accessToken: null,
    refreshToken: null,
}

const sessionSlice = createSlice({
    name: `${SLICE_BASE_NAME}/session`,
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<SessionState>) {
            state.signedIn = true
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },

        signOutSuccess(state) {
            state.signedIn = false
            state.accessToken = null
            state.refreshToken = null
        },
    },
})

export const { signInSuccess, signOutSuccess } = sessionSlice.actions
export default sessionSlice.reducer
