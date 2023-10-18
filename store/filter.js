import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    filterData: null,
    filterStatus: false
}


const filter = createSlice({ 
    name:'filter',
    initialState,
    reducers:{
        setFilter(state, action){
            state.filterData = action.payload
        },
        setFilterStatus(state, action){
            state.filterStatus = action.payload
        },
        resertFilter(state){
            state.filterData = null
        }
    }
})

export const {setFilter, setFilterStatus, resertFilter} = filter.actions
export default filter.reducer

