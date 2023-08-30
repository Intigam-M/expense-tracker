'use client'
import Backdrop from "@/components/global/backdrop"
import Expense from "@/components/expensePage"
import AddExpenseModal from "@/components/expensePage/expenseModals/addExpenseModal"
import AddExpenseCategoryModal from "@/components/expensePage/expenseModals/addExpenseCategoryModal"
import { MdAddCircle } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { setAddExpenseCategoryModalStatus } from '@/store/modal'
import { FiEdit2 } from 'react-icons/fi'
import {useEffect, useState } from 'react'
import EditExpenseModal from "@/components/expensePage/expenseModals/editExpenseModal"
import { listenForDataUpdates } from "@/app/firebase"


function ExpenseContainer() {
    const addExpenseModalIsActive = useSelector(state => state.modal.addExpense)
    const addExpenseCategoryModalIsActive = useSelector(state => state.modal.addExpenseCategory)
    const editExpenseModalIsActive = useSelector(state => state.modal.editExpense)
    const userId = useSelector(state => state.auth.user.uid)
    const [editIsactive, setEditIsActive] = useState(false)
    const [expenseCategory, setExpenseCategory] = useState([])
    const dispatch = useDispatch()

    const handleAddClick = () => {
        dispatch(setAddExpenseCategoryModalStatus(!addExpenseCategoryModalIsActive))
    }


    const handleEditClick = () => {
        setEditIsActive(!editIsactive)
    }

    useEffect(() => {
        listenForDataUpdates(userId + '/expenseCategory', (data) => {
            setExpenseCategory(data)
        })
    }, [])

    return (
        <div >
            {(addExpenseModalIsActive || addExpenseCategoryModalIsActive || editExpenseModalIsActive) && <Backdrop />}
            {addExpenseCategoryModalIsActive && <AddExpenseCategoryModal />}
            {addExpenseModalIsActive && <AddExpenseModal />}
            {editExpenseModalIsActive && <EditExpenseModal />}
            <div className="w-4/12 mx-auto ">
                <div className="flex justify-end mb-1 gap-2">
                    <FiEdit2 title="Düzəliş et" size={35} className={`text-2xl text-white p-2 rounded cursor-pointer ${editIsactive ? "bg-red-500" : "opacity-40 bg-red-400"} `} onClick={handleEditClick} />
                    <MdAddCircle title="Xərc əlavə et" size={35} className='text-2xl text-white p-2 bg-green-500 rounded cursor-pointer' onClick={handleAddClick} />
                </div>
                <div className='grid grid-cols-4 gap-3 '>
                    {expenseCategory.map((category, index) => <Expense key={index} category={category} editIsactive={editIsactive} />)}
                </div>
            </div>
        </div>
    )
}

export default ExpenseContainer