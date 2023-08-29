'use client'
import React from 'react'
import Income from '@/components/incomePage';
import { MdAddCircle } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import Backdrop from "@/components/global/backdrop"
import AddIncomeCategoryModal from "@/components/incomePage/incomeModals/addIncomeCategoryModal"
import AddIncomeModal from "@/components/incomePage/incomeModals/addIncomeModal"
import { setAddIncomeCategoryModalStatus } from '@/store/modal'
import { FiEdit2 } from 'react-icons/fi'
import { useState } from 'react'
import EditIncomeModal from "@/components/incomePage/incomeModals/editIncomeModal"

function IncomeContainer() {
    const dispatch = useDispatch()
    const addIncomeCategoryModalIsActive = useSelector(state => state.modal.addIncomeCategory)
    const addIncomeModalIsActive = useSelector(state => state.modal.addIncome)
    const editIncomeModalIsActive = useSelector(state => state.modal.editIncome)
    const [editIsactive, setEditIsActive] = useState(false)

    const handleAddClick = () => {
        dispatch(setAddIncomeCategoryModalStatus(!addIncomeCategoryModalIsActive))
    }

    const handleEditClick = () => {
        setEditIsActive(!editIsactive)
    }

    return (
        <div>
            {(addIncomeCategoryModalIsActive || addIncomeModalIsActive || editIncomeModalIsActive) && <Backdrop />}
            {addIncomeCategoryModalIsActive && <AddIncomeCategoryModal />}
            {addIncomeModalIsActive && <AddIncomeModal />}
            {editIncomeModalIsActive && <EditIncomeModal />}
            <div className="w-4/12 mx-auto ">
                <div className="flex justify-end mb-1 gap-2">
                    <FiEdit2 title="Düzəliş et" size={35} className={`text-2xl text-white p-2 rounded cursor-pointer ${editIsactive ? "bg-red-500" : "opacity-40 bg-red-400"} `} onClick={handleEditClick} />
                    <MdAddCircle title="Xərc əlavə et" size={35} className='text-2xl text-white p-2 bg-green-500 rounded cursor-pointer' onClick={handleAddClick} />
                </div>

                <div className='grid grid-cols-4 gap-3 '>
                    <Income editIsactive={editIsactive} />
                    <Income editIsactive={editIsactive} />
                    <Income editIsactive={editIsactive} />
                    <Income editIsactive={editIsactive} />
                    <Income editIsactive={editIsactive} />
                </div>
            </div>
        </div>
    )
}

export default IncomeContainer