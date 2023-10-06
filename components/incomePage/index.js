'use client'
import { TbCurrencyManat } from 'react-icons/Tb';
import * as ReactIcons from 'react-icons/fa';
import { filterTransactionforCategory, totalCategoryAmount } from '@/helper'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function Income({ category, categoryId, transaction, onClick }) {

    const [incomeAmount, setIncomeAmount] = useState()
    const date = useSelector(state => state.date)


    useEffect(() => {

        const incomeTransaction = filterTransactionforCategory(transaction, categoryId, 1, date);
        const incomeAmount = totalCategoryAmount(incomeTransaction);
        setIncomeAmount(incomeAmount)

    }, [transaction, date])



    const IncomeIcon = ReactIcons[category.icon];

    const divStyle = {
        backgroundColor: category.color
    };


    return (
        <button onClick={onClick}>
        <div className='flex flex-col items-center bg-slate-300 rounded-md p-2 border shadow'>
            <p className='text-slate-700'>{category.name}</p>
            <div className='rounded-full p-3' style={divStyle}>
                <IncomeIcon className='text-xl text-white' />
            </div>
            <div>
                <div className='flex items-center text-green-600 font-medium'>
                    <p>{incomeAmount}</p>
                    <TbCurrencyManat />
                </div>
            </div>
        </div>
        </button>
    )
}

export default Income