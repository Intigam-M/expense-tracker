'use client'
import { TbCurrencyManat } from 'react-icons/Tb';
import { FaWallet } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setAddExpenseModalStatus, setEditExpenseModalStatus } from '@/store/modal'
import * as ReactIcons from 'react-icons/fa';


function Expense({ editIsactive, category }) {

    const dispatch = useDispatch()
    const addExpenseModalIsActive = useSelector(state => state.modal.addExpense)
    const editExpenseModalIsActive= useSelector(state => state.modal.editExpense)
    const ExpenseIcon = ReactIcons[category.icon];
    
    const divStyle = {
        backgroundColor: category.color
      };



    const handleClick = () => {
        if (editIsactive){
            dispatch(setEditExpenseModalStatus(!editExpenseModalIsActive))
        }else{
            dispatch(setAddExpenseModalStatus(!addExpenseModalIsActive))
        }
    }

    return (
        <button onClick={handleClick}>
            <div className='flex flex-col items-center bg-slate-300 rounded-md p-2 border shadow'>
                <p className='text-slate-700'>{category.name}</p>
                <div className='rounded-full p-3' style={divStyle}>
                    <ExpenseIcon className='text-xl text-white' />
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