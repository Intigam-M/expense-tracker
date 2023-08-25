import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    addExpense: false,
    addExpenseCategory: false,
    addIncome: false,
    addIncomeCategory: false,
}

const modal = createSlice({ 
    name:'modal',
    initialState,
    reducers:{
        setAddExpenseModalStatus(state){
            state.addExpense = !state.addExpense
        },
        setAddExpenseCategoryModalStatus(state){
            state.addExpenseCategory = !state.addExpenseCategory
        },
        setAddIncomeModalStatus(state){
            state.addIncome = !state.addIncome
        },
        setAddIncomeCategoryModalStatus(state){
            state.addIncomeCategory = !state.addIncomeCategory
        },
        closeAllModal(state){
            state.addExpense = false
            state.addExpenseCategory = false
            state.addIncome = false
            state.addIncomeCategory = false
        }

    }
})

export const {setAddExpenseModalStatus, setAddExpenseCategoryModalStatus, setAddIncomeModalStatus, setAddIncomeCategoryModalStatus, closeAllModal} = modal.actions
export default modal.reducer

