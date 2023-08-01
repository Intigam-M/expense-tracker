import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: false
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload
        },
        logout(state) {
            localStorage.removeItem('user')
            state.user = false
        }
    }
})

export const { setUser, logout } = auth.actions
export default auth.reducer