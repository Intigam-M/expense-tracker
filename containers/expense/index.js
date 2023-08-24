'use client'
import Backdrop from "@/components/global/backdrop"
import Expense from "@/components/expensePage"
import ExpenseModal from "@/components/expensePage/expenseModal"
import { MdAddCircle } from 'react-icons/md'
import { useSelector } from 'react-redux'


function ExpenseContainer() {
    const expenseModal = useSelector(state => state.modal.expense)

    return (
        <div >
            {expenseModal.show && (
                <>
                    <Backdrop />
                    <ExpenseModal />
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