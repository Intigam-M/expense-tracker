import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    // month: new Date().getMonth(),
    // year: new Date().getFullYear()
    startDate: new Date().setDate(1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
}


const date = createSlice({ 
    name:'date',
    initialState,
    reducers:{
        // setMonth(state, action){
        //     state.month = action.payload
        // },
        // setYear(state, action){
        //     state.year = action.payload
        // }

        setStartDate(state, action){
            state.startDate = action.payload
        },
        setEndDate(state, action){
            state.endDate = action.payload
        }

    }
})

export const {setMonth, setYear, setStartDate, setEndDate} = date.actions
export default date.reducer

