'use client'
import { TbCurrencyManat } from 'react-icons/Tb';
import { FaWallet } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setExpenseModal } from '@/store/modal'


function Expense() {

    const dispatch = useDispatch()
    const { show } = useSelector(state => state.modal.expense)


    const handleClick = () => {
        dispatch(setExpenseModal({ show: !show, data: {} }))
    }

    return (
        <button onClick={handleClick}>
            <div className='flex flex-col items-center bg-slate-300 rounded-md p-2 border shadow'>
                <p className='text-slate-700'>Market</p>
                <div className='rounded-full bg-orange-500 p-3'>
                    <FaWallet className='text-xl text-white' />
                </div>
                <div>
                    <div className='flex items-center text-red-600 font-medium'>
                        <p>100.00</p>
                        <TbCurrencyManat />
                    </div>
                </div>
            </div>
        </button>
    )
}

export default Expense