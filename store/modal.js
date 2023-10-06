import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    addExpense: false,
    updateExpenseCategory: false,
    editExpenseSubCategory: false,
    addIncome: false,
    updateIncomeCategory: false,
    updateAccount: false,
    transfer: false,
    updateTransaction: false,
    filterTransaction: false,
}

const modal = createSlice({ 
    name:'modal',
    initialState,
    reducers:{
        setAddExpenseModalStatus(state){
            state.addExpense = !state.addExpense
        },
        setUpdateExpenseCategoryModalStatus(state){
            state.updateExpenseCategory = !state.updateExpenseCategory
        },
        setEditExpenseSubCategoryModalStatus(state){
            state.editExpenseSubCategory = !state.editExpenseSubCategory
        },
        setAddIncomeModalStatus(state){
            state.addIncome = !state.addIncome
        },
        setUpdateIncomeCategoryModalStatus(state){
            state.updateIncomeCategory = !state.updateIncomeCategory
        },
        setUpdateAccountModalStatus(state){
            state.updateAccount = !state.updateAccount
        },
        setTransferModalStatus(state){
            state.transfer = !state.transfer
        },
        setUpdateTransactionModalStatus(state){
            state.updateTransaction = !state.updateTransaction
        },
        setFilterTransactionModalStatus(state){
            state.filterTransaction = !state.filterTransaction
        },

        closeAllModal(state){
            state.addExpense = false
            state.updateExpenseCategory = false
            state.editExpenseSubCategory = false
            state.addIncome = false
            state.updateIncomeCategory = false
            state.updateAccount = false
            state.transfer = false
            state.updateTransaction = false
            state.filterTransaction = false
        }
    }
})

export const {setAddExpenseModalStatus, setUpdateExpenseCategoryModalStatus, setAddIncomeModalStatus, setUpdateIncomeCategoryModalStatus, setUpdateAccountModalStatus, setTransferModalStatus, setEditExpenseSubCategoryModalStatus, setUpdateTransactionModalStatus, setFilterTransactionModalStatus, closeAllModal} = modal.actions
export default modal.reducer

