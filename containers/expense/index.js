'use client'
import Backdrop from "@/components/global/backdrop"
import Expense from "@/components/expensePage"
import AddExpenseModal from "@/components/expensePage/expenseModals/addExpenseModal"
import AddExpenseCategoryModal from "@/components/expensePage/expenseModals/addExpenseCategoryModal"
import { MdAddCircle } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { setAddExpenseCategoryModalStatus } from '@/store/modal'


function ExpenseContainer() {
    const addExpenseModalIsActive = useSelector(state => state.modal.addExpense)
    const addExpenseCategoryModalIsActive = useSelector(state => state.modal.addExpenseCategory)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setAddExpenseCategoryModalStatus(!addExpenseCategoryModalIsActive))
    }


    return (
        <div >
            {(addExpenseModalIsActive || addExpenseCategoryModalIsActive) && <Backdrop />}
            {addExpenseCategoryModalIsActive && <AddExpenseCategoryModal />}
            {addExpenseModalIsActive && <AddExpenseModal />}

            <div className='w-4/12 mx-auto grid grid-cols-4 gap-3 '>
                <Expense />
                <Expense />
                <Expense />
                <Expense />
                <Expense />
                <Expense />

                <div className='flex justify-center'>
                    <button  onClick={handleClick}>
                        <MdAddCircle className='text-7xl text-green-400' />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ExpenseContainer