'use client'
import Expense from '@/components/dashboardLayout/balanceCard/expense';
import Income from '@/components/dashboardLayout/balanceCard/income';
import { useEffect, useState } from 'react';
import { listenForDataUpdates } from "@/app/firebase"
import { TbCurrencyManat } from 'react-icons/Tb';
import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'
import { setMonth, setYear } from '@/store/date';
import { useDispatch, useSelector } from 'react-redux';



function BalanceCard() {
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    const [balance, setBalance] = useState(0)
    const userId = useSelector(state => state.auth.user.uid)

    const date = useSelector(state => state.date)

    const dispatch = useDispatch()

    useEffect(() => {
        listenForDataUpdates('user/' + userId + '/transaction', (data) => {
            let income = 0
            let expense = 0
            for (let key in data) {
                if (data[key].transactionType === 1 && new Date(data[key].date).getMonth() === date.month &&
                    new Date(data[key].date).getFullYear() === date.year) {
                    income += parseInt(data[key].amount)
                } else if (data[key].transactionType === 2 && new Date(data[key].date).getMonth() === date.month &&
                    new Date(data[key].date).getFullYear() === date.year) {
                    expense += parseInt(data[key].amount)
                }
            }
            setIncome(income)
            setExpense(expense)
        })

        listenForDataUpdates('user/' + userId + '/account', (data) => {
            let balance = 0
            for (let key in data) {
                if (data[key].balanceImpact) {
                    balance += parseInt(data[key].balance)
                }
            }
            setBalance(balance)
        })

    }, [date])


    const previousMonth = () => {
        if (date.month === 0) {
            dispatch(setMonth(11))
            dispatch(setYear(date.year - 1))
        } else {
            dispatch(setMonth(date.month - 1))
        }
    }

    const nextMonth = () => {
        if (date.month === 11) {
            dispatch(setMonth(0))
            dispatch(setYear(date.year + 1))
        } else {
            dispatch(setMonth(date.month + 1))
        }
    }




    return (
        <div className='flex justify-center'>
            <div className='w-4/12 border bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded-xl'>
                <div className='flex flex-col items-center gap-5 select-none'>
                    <p className='font-bold text-white text-2xl'>Total balance</p>
                    <div className='flex font-bold text-white text-6xl w-full justify-between'>
                        <FaChevronLeft onClick={previousMonth} className='cursor-pointer' />
                        <div className='flex'>
                            <p>{balance}</p>
                            <TbCurrencyManat />
                        </div>

                        <FaChevronRight onClick={nextMonth} className='cursor-pointer' />
                    </div>
                    <div className='flex w-full justify-between'>
                        <Income income={income} />
                        <p className='font-medium text-white'>{date.month < 9 ? "0" + (date.month + 1) : (date.month + 1)} / {date.year}</p>
                        <Expense expense={expense} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BalanceCard