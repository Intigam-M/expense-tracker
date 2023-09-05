import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    addExpense: false,
    updateExpenseCategory: false,
    editExpenseSubCategory: false,
    addIncome: false,
    updateIncomeCategory: false,
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
            state.updateExpenseCategory = false
            state.editExpenseSubCategory = false
            state.addIncome = false
            state.updateIncomeCategory = false
            state.addAccount = false
            state.editAccount = false
            state.transfer = false
        }

    }
})

export const {setAddExpenseModalStatus, setUpdateExpenseCategoryModalStatus, setAddIncomeModalStatus, setUpdateIncomeCategoryModalStatus, setAddAccountModalStatus, setEditAccountModalStatus, setTransferModalStatus, setEditExpenseSubCategoryModalStatus, closeAllModal} = modal.actions
export default modal.reducer

