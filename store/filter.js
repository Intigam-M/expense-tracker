import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    filterData: null
}


const filter = createSlice({ 
    name:'filter',
    initialState,
    reducers:{
        setFilter(state, action){
            state.filterData = action.payload
        }
    }
})

export const {setFilter} = filter.actions
export default filter.reducer

