'use client'
import { useState, useEffect } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterTransactionModalStatus } from '@/store/modal'
import { updateData, listenForDataUpdates, deleteData, getData } from '@/app/firebase'
import toast from "react-hot-toast";


function FilterTransactionModal() {

    const userId = useSelector(state => state.auth.user.uid)
    const filterTransactionModalIsActive = useSelector(state => state.modal.filterTransaction)
    const dispatch = useDispatch()

    useEffect(() => {

    }, []);


    const closeModal = () => {
        dispatch(setFilterTransactionModalStatus(!filterTransactionModalIsActive))
    }


    return (
        <div className='bg-white w-4/12 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-between items-center shadow-md mb-5'>
                <p className='text-slate-500 pl-5 font-bold'> Filter Transaction</p>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5'>
                <div>
                    <div className='mt-5'>
                            <p>testsibk</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterTransactionModal