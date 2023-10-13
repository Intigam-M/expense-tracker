'use client'
import { useState, useEffect } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterDateModalStatus } from '@/store/modal'
import { setStartDate, setEndDate } from '@/store/date'


function DateFilterModal() {

    const filterDateModalIsActive = useSelector(state => state.modal.filterDate)
    const [selectedStartDate, setSelectedStartDate] = useState('')
    const [selectedEndDate, setSelectedEndDate] = useState('')
    const date = useSelector(state => state.date)


    const dispatch = useDispatch()

    useEffect(() => {
        let startDate = new Date(date.startDate)
        startDate.setDate(startDate.getDate() + 1);
        startDate = startDate.toISOString().substr(0, 10)

        const endDate = new Date(date.endDate).toISOString().substr(0, 10)

        setSelectedStartDate(startDate)
        setSelectedEndDate(endDate)
    }, [date])

    const closeModal = () => {
        dispatch(setFilterDateModalStatus(!filterDateModalIsActive))
    }

    const handleDateFilter = () => {
        const startDate = new Date(selectedStartDate).setHours(0, 0, 0)
        const endDate = new Date(selectedEndDate).setHours(23, 59, 59)

        dispatch(setStartDate(startDate))
        dispatch(setEndDate(endDate))

        dispatch(setFilterDateModalStatus(!filterDateModalIsActive))
    }

    return (
        <div className='bg-white w-4/12 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-between items-center shadow-md mb-5'>
                <p className='text-slate-500 pl-5 font-bold'>Change date</p>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5'>
                <div>
                    <div className='mt-5'>
                        <p className='text-sm text-slate-500'>Tarixden</p>
                        <input type="date" className='p-1.5 border rounded w-full' value={selectedStartDate} onChange={e => setSelectedStartDate(e.target.value)} />

                        <p className='text-sm text-slate-500'>Tarixe</p>
                        <input type="date" className='p-1.5 border rounded w-full' value={selectedEndDate} onChange={e => setSelectedEndDate(e.target.value)} />
                    </div>
                    <button className='bg-green-500 rounded w-full py-2 text-white font-bold mt-8 tracking-widest' onClick={handleDateFilter}>Filter</button>
                </div>
            </div>
        </div>
    )
}

export default DateFilterModal