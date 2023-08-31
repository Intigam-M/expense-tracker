'use client'
import { TbCurrencyManat } from 'react-icons/Tb';
import * as ReactIcons from 'react-icons/fa';


function Expense({ category, onClick }) {

    const ExpenseIcon = ReactIcons[category.icon];

    const divStyle = {
        backgroundColor: category.color
    };

    return (
        <button onClick={onClick}>
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