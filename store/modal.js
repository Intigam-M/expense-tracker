import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    expense:{
        show:false,
        data:{}
    },
    income:{
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
        },
        setIncomeModal(state,action){
            state.income.show = action.payload.show
            state.income.data = action.payload.data
        },
        closeIncomeModal(state){
            state.income.show = false 
        },
        closeAllModal(state){
            state.income.show = false 
            state.expense.show = false 
        }

    }
})

export const {setExpenseModal, closeExpenseModal, setIncomeModal, closeIncomeModal, closeAllModal} = modal.actions
export default modal.reducer

