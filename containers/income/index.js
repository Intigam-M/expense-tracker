'use client'
import React from 'react'
import Income from '@/components/incomePage';
import { MdAddCircle } from 'react-icons/md'
import { useSelector } from 'react-redux'
import Backdrop from "@/components/global/backdrop"
import IncomeModal from "@/components/incomePage/incomeModal"

function IncomeContainer() {
    const incomeModal = useSelector(state => state.modal.income)
    return (
        <div>
             {incomeModal.show && (
                <>
                    <Backdrop />
                    <IncomeModal />
                </>
            )}
            <div className='w-4/12 mx-auto grid grid-cols-4 gap-3 '>
                <Income />
                <Income />
                <Income />
                <Income />
                <Income />
                <div className='flex justify-center'>
                    <button>
                        <MdAddCircle className='text-7xl text-green-400' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default IncomeContainer