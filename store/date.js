import { createSlice } from "@reduxjs/toolkit";

const startDate = new Date().setDate(1)
const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

const initialState = {
    startDate: new Date(startDate).setHours(0, 0, 0),
    endDate: new Date(endDate).setHours(23, 59, 59)
}

const date = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setStartDate(state, action) {
            state.startDate = action.payload
        },
        setEndDate(state, action) {
            state.endDate = action.payload
        }
    }
})

export const { setMonth, setYear, setStartDate, setEndDate } = date.actions
export default date.reducer

