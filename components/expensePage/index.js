'use client'
import { TbCurrencyManat } from 'react-icons/Tb';
import { FaWallet } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setAddExpenseModalStatus} from '@/store/modal'


function Expense() {

    const dispatch = useDispatch()
    const addExpenseModalIsActive = useSelector(state => state.modal.addExpense)


    const handleClick = () => {
       dispatch(setAddExpenseModalStatus(!addExpenseModalIsActive))
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