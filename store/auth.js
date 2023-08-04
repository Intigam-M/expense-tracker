'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:  typeof window !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            typeof window !== 'undefined' && localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload
        },
        removeUser(state) {
            typeof window !== 'undefined' && localStorage.removeItem('user')
            state.user = false
        }
    }
})

export const { setUser, removeUser } = auth.actions
export default auth.reducer