'use client'
import Expense from '@/components/dashboardLayout/balanceCard/expense';
import Income from '@/components/dashboardLayout/balanceCard/income';
import { useEffect, useState } from 'react';
import { listenForDataUpdates } from "@/app/firebase"
import { useSelector } from 'react-redux';
import { TbCurrencyManat } from 'react-icons/Tb';

function BalanceCard() {
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    const [balance, setBalance] = useState(0)
    const userId = useSelector(state => state.auth.user.uid)

    useEffect(() => {
        listenForDataUpdates('user/' + userId + '/transaction', (data) => {
            let income = 0
            let expense = 0
            for (let key in data) {
                if (data[key].transactionType === 1) {
                    income += parseInt(data[key].amount)
                } else if(data[key].transactionType === 2) {
                    expense += parseInt(data[key].amount)
                }
            }
            setIncome(income)
            setExpense(expense)
        })

        listenForDataUpdates('user/' + userId + '/account', (data) => {
            let balance = 0
            for (let key in data) {
                balance += parseInt(data[key].balance)
            }
            setBalance(balance)
        })



    }, [])



    return (
        <div className='flex justify-center'>
            <div className='w-4/12 border bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded-xl'>
                <div className='flex flex-col items-center gap-5'>
                    <p className='font-bold text-white text-2xl'>Total balance</p>
                    <div className='flex font-bold text-white text-6xl'>
                        <p>{balance}</p>
                        <TbCurrencyManat />
                    </div>
                    <div className='flex w-full justify-between'>
                        <Income income={income}/>
                        <Expense expense={expense} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BalanceCard