import {createSlice} from "@reduxjs/toolkit";

const initialState = null


const editExpenseSubCategory = createSlice({ 
    name:'editExpenseSubCategory',
    initialState,
    reducers:{
        setEditExpenseSubCategory(state, action){
            return action.payload
        }
    }
})

export const {setEditExpenseSubCategory} = editExpenseSubCategory.actions
export default editExpenseSubCategory.reducer

