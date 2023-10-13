'use client'
import Expense from '@/components/dashboardLayout/balanceCard/expense';
import Income from '@/components/dashboardLayout/balanceCard/income';
import { useEffect, useState } from 'react';
import { listenForDataUpdates } from "@/app/firebase"
import { TbCurrencyManat } from 'react-icons/Tb';
import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'
import { setStartDate, setEndDate } from '@/store/date';
import { useDispatch, useSelector } from 'react-redux';



function BalanceCard() {
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    const [balance, setBalance] = useState(0)
    const userId = useSelector(state => state.auth.user.uid)
    const date = useSelector(state => state.date)

    const dispatch = useDispatch()

    useEffect(() => {
        const startDate = new Date(date.startDate).setHours(0, 0, 0)
        const endDate = new Date(date.endDate).setHours(23, 59, 59)
        listenForDataUpdates('user/' + userId + '/transaction', (data) => {
            let income = 0
            let expense = 0
            for (let key in data) {
                if (data[key].transactionType === 1 && new Date(data[key].date) >= startDate && new Date(data[key].date) <= endDate) {
                    income += parseInt(data[key].amount)
                } else if (data[key].transactionType === 2 && new Date(data[key].date) >= startDate && new Date(data[key].date) <= endDate) {
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
        const startDate = new Date(date.startDate)
        const endDate = new Date(date.endDate)
        
        startDate.setMonth(startDate.getMonth() - 1)
        startDate.setDate(1)
        endDate.setMonth(endDate.getMonth(), 0)
        
        dispatch(setStartDate(startDate))
        dispatch(setEndDate(endDate))
    }

    const nextMonth = () => {
        const startDate = new Date(date.startDate)
        const endDate = new Date(date.endDate)
        
        startDate.setMonth(startDate.getMonth() + 1)
        endDate.setMonth(endDate.getMonth() + 2, 0)

        dispatch(setStartDate(startDate))
        dispatch(setEndDate(endDate))
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
                        <Expense expense={expense} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BalanceCard