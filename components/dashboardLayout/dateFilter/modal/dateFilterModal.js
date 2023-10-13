'use client'
import { useState, useEffect } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterDateModalStatus } from '@/store/modal'
import { updateData, listenForDataUpdates, deleteData, getData } from '@/app/firebase'


function DateFilterModal() {

    const userId = useSelector(state => state.auth.user.uid)
    const filterDateModalIsActive = useSelector(state => state.modal.filterDate)
    const [endDate, setEndDate] = useState('')
    const [startDate, setstartDate] = useState('')


    const dispatch = useDispatch()

    useEffect(() => {

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().substr(0, 10);
        setEndDate(formattedDate);

        // select current month first day
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
        const formattedFirstDay = firstDay.toISOString().substr(0, 10);
        setstartDate(formattedFirstDay);

    }, []);

    const closeModal = () => {
        dispatch(setFilterDateModalStatus(!filterDateModalIsActive))
    }


    const handleDateFilter = () => {
        console.log(startDate, endDate)
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
                        <input type="date" className='p-1.5 border rounded w-full' value={startDate} onChange={e => setDate(e.target.value)} />

                        <p className='text-sm text-slate-500'>Tarixe</p>
                        <input type="date" className='p-1.5 border rounded w-full' value={endDate} onChange={e => setDate(e.target.value)} />
                    </div>
                    <button className='bg-green-500 rounded w-full py-2 text-white font-bold mt-8 tracking-widest' onClick={handleDateFilter}>Filter</button>
                </div>
            </div>
        </div>
    )
}

export default DateFilterModal