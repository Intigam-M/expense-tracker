import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    expense:{
        show:false,
        data:{}
    }
}

const modal = createSlice({ 
    name:'modal',
    initialState,
    reducers:{
        setExpenseModal(state,action){
            state.expense.show = action.payload.show
            state.expense.data = action.payload.data
        },
        closeExpenseModal(state){
            state.expense.show = false 
        }
    }
})

export const {setExpenseModal, closeExpenseModal} = modal.actions
export default modal.reducer

