'use client'
import Backdrop from "@/components/global/backdrop"
import Expense from "@/components/expensePage"
import AddExpenseModal from "@/components/expensePage/expenseModals/addExpenseModal"
import { MdAddCircle } from 'react-icons/md'
import { useSelector } from 'react-redux'


function ExpenseContainer() {
    const addExpenseModalIsActive= useSelector(state => state.modal.addExpense)

    return (
        <div >
            {addExpenseModalIsActive && (
                <>
                    <Backdrop />
                    <AddExpenseModal />
                </>
            )}
            <div className='w-4/12 mx-auto grid grid-cols-4 gap-3 '>
                <Expense />
                <Expense />
                <Expense />
                <Expense />
                <Expense />
                <Expense />

                <div className='flex justify-center'>
                    <button>
                        <MdAddCircle className='text-7xl text-green-400' />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ExpenseContainer