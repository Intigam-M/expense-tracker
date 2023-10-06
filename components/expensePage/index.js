'use client'
import { TbCurrencyManat } from 'react-icons/Tb';
import * as ReactIcons from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { filterTransactionforCategory, totalCategoryAmount } from '@/helper'
import { useSelector } from 'react-redux';


function Expense({ category, categoryId, transaction, onClick }) {

    const [expenseAmount, setExpenseAmount] = useState()
    const date = useSelector(state => state.date)


    useEffect(() => {

        const expenseTransaction = filterTransactionforCategory(transaction, categoryId, 2, date);
        const expenseAmount = totalCategoryAmount(expenseTransaction);
        setExpenseAmount(expenseAmount)

    }, [transaction, date])


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
                        <p>{expenseAmount}</p>
                        <TbCurrencyManat />
                    </div>
                </div>
            </div>
        </button>
    )
}

export default Expense