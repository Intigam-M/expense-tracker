import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
}


const date = createSlice({ 
    name:'date',
    initialState,
    reducers:{
        setMonth(state, action){
            state.month = action.payload
        },
        setYear(state, action){
            state.year = action.payload
        }
    }
})

export const {setMonth, setYear} = date.actions
export default date.reducer

