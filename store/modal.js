import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    addExpense: false,
    addExpenseCategory: false,
    editExpense: false,
    addIncome: false,
    addIncomeCategory: false,
    editIncome: false,
    addAccount: false,
    editAccount: false,
    transfer: false,
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
        setEditExpenseModalStatus(state){
            state.editExpense = !state.editExpense
        },
        setAddIncomeModalStatus(state){
            state.addIncome = !state.addIncome
        },
        setAddIncomeCategoryModalStatus(state){
            state.addIncomeCategory = !state.addIncomeCategory
        },
        setEditIncomeModalStatus(state){
            state.editIncome = !state.editIncome
        },
        setAddAccountModalStatus(state){
            state.addAccount = !state.addAccount
        },
        setEditAccountModalStatus(state){
            state.editAccount = !state.editAccount
        },
        setTransferModalStatus(state){
            state.transfer = !state.transfer
        },


        closeAllModal(state){
            state.addExpense = false
            state.addExpenseCategory = false
            state.editExpense = false
            state.addIncome = false
            state.addIncomeCategory = false
            state.editIncome = false
            state.addAccount = false
            state.editAccount = false
            state.transfer = false
        }

    }
})

export const {setAddExpenseModalStatus, setAddExpenseCategoryModalStatus, setAddIncomeModalStatus, setAddIncomeCategoryModalStatus, setAddAccountModalStatus, setEditAccountModalStatus, setTransferModalStatus, setEditExpenseModalStatus, setEditIncomeModalStatus, closeAllModal} = modal.actions
export default modal.reducer

