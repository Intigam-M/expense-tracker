'use client'
import React from 'react'
import Income from '@/components/incomePage';
import { MdAddCircle } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import Backdrop from "@/components/global/backdrop"
import AddIncomeCategoryModal from "@/components/incomePage/incomeModals/addIncomeCategoryModal"
import AddIncomeModal from "@/components/incomePage/incomeModals/addIncomeModal"
import { setAddIncomeCategoryModalStatus } from '@/store/modal'

function IncomeContainer() {
    const dispatch = useDispatch()
    const addIncomeCategoryModalIsActive = useSelector(state => state.modal.addIncomeCategory)
    const addIncomeModalIsActive = useSelector(state => state.modal.addIncome)


    const handleClick = () => {
        dispatch(setAddIncomeCategoryModalStatus(!addIncomeCategoryModalIsActive))
    }

    return (
        <div>
            {(addIncomeCategoryModalIsActive || addIncomeModalIsActive) && <Backdrop />}
            {addIncomeCategoryModalIsActive && <AddIncomeCategoryModal />}
            {addIncomeModalIsActive && <AddIncomeModal />}
            
            <div className='w-4/12 mx-auto grid grid-cols-4 gap-3 '>
                <Income />
                <Income />
                <Income />
                <Income />
                <Income />
                <div className='flex justify-center'>
                    <button onClick={handleClick}>
                        <MdAddCircle className='text-7xl text-green-400' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default IncomeContainer