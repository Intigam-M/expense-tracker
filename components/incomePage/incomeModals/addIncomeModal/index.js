'use client'
import { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setAddIncomeModalStatus } from '@/store/modal'

function AddincomeModal() {
    const [amount, setAmount] = useState(0)
    const [note, setNote] = useState('')
    const [date, setDate] = useState('')
    const addIncomeModalIsActive = useSelector(state => state.modal.addIncome)
    const dispatch = useDispatch()

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().substr(0, 10);
        setDate(formattedDate);
    }, []);

    const closeModal = () => {
        dispatch(setAddIncomeModalStatus(!addIncomeModalIsActive))
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
                        <p className='text-xs pl-1'>Kateqoriyadan:</p>
                        <select defaultValue={'DEFAULT'} className="bg-red-500 text-white text-xl font-medium  block w-full border-none focus:outline-none">
                            <option value="DEFAULT">Maas</option>
                            <option value="CA">Biznes</option>
                            <option value="FR">Diger</option>
                        </select>
                    </div>
                    <div className='p-3 bg-blue-500 text-white rounded-tr rounded-br'>
                        <p className='text-xs pl-1'>Hesaba:</p>
                        <select defaultValue={'DEFAULT'} className="bg-blue-500 text-white text-xl font-medium block w-full border-none focus:outline-none">
                            <option value="DEFAULT">Kapital</option>
                            <option value="CA">Xalq</option>
                            <option value="FR">Nagd</option>
                        </select>

                    </div>
                </div>
                <div>
                    <form className='mt-5'>
                        <p className='text-sm text-slate-500'>Məbləğ gəlir</p>
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

export default AddincomeModal