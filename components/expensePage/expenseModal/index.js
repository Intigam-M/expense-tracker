'use client'
import { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { closeExpenseModal } from '@/store/modal'

function ExpenseModal() {
    const [amount, setAmount] = useState(0)
    const [note, setNote] = useState('')
    const [date, setDate] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().substr(0, 10);
        setDate(formattedDate);
    }, []);

    const closeModal = () => {
        dispatch(closeExpenseModal())
    }




    return (
        <div className='bg-white w-4/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-end'>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5'>
                <div className='grid grid-cols-2'>
                    <div className='p-3 bg-red-500 text-white rounded-tl rounded-bl'>
                        <p className='text-xs'>Hesabdan:</p>
                        <p className='font-medium text-xl'>Kapital</p>
                    </div>
                    <div className='p-3 bg-blue-500 text-white rounded-tr rounded-br'>
                        <p className='text-xs'>Kateqoriya:</p>
                        <p className='font-medium text-xl'>Ərzaq</p>
                    </div>
                </div>
                <div>
                    <form className='mt-5'>
                        <p className='text-sm text-slate-500'>Məbləğ</p>
                        <input type="number" className='p-1 border rounded w-full' value={amount} onChange={e => setAmount(e.target.value)} />

                        <p className='text-sm text-slate-500'>Qeyd</p>
                        <input type="text" className='p-1 border rounded w-full' value={note} onChange={e => setNote(e.target.value)} />

                        <p className='text-sm text-slate-500'>Tarix</p>
                        <input type="date" className='p-1 border rounded w-full' value={date} onChange={e => setDate(e.target.value)} />

                        <button className=' py-2 w-full bg-green-500 rounded mt-5 text-white font-bold'>Daxil et</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ExpenseModal