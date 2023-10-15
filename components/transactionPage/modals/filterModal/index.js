'use client'
import { useState, useEffect, use } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterTransactionModalStatus } from '@/store/modal'
import { updateData, listenForDataUpdates, deleteData, getData } from '@/app/firebase'
import toast from "react-hot-toast";
import classNames from 'classnames'
import { setFilter } from '@/store/filter'


function FilterTransactionModal() {

    const userId = useSelector(state => state.auth.user.uid)
    const filterTransactionModalIsActive = useSelector(state => state.modal.filterTransaction)
    const [accounts, setAccounts] = useState()
    const [expenses, setExpenses] = useState()
    const [incomes, setIncomes] = useState()

    const [selectedAccount, setSelectedAccount] = useState([])
    const [selectedExpense, setSelectedExpense] = useState([])
    const [selectedIncome, setSelectedIncome] = useState([])
    const [selectedTransactionType, setSelectedTransactionType] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {

        getData('user/' + userId + '/account/')
            .then(data => setAccounts(data))

        getData('user/' + userId + '/expenseCategory/')
            .then(data => setExpenses(data))

        getData('user/' + userId + '/incomeCategory/')
            .then(data => setIncomes(data))
    }, []);

    const closeModal = () => {
        dispatch(setFilterTransactionModalStatus(!filterTransactionModalIsActive))
    }

    const selectTransaction = (transactionId) => {
        if (selectedTransactionType.includes(transactionId)) {
            const index = selectedTransactionType.indexOf(transactionId);
            if (index > -1) {
                selectedTransactionType.splice(index, 1);
                setSelectedTransactionType([...selectedTransactionType]);
            }
        } else {
            selectedTransactionType.push(transactionId);
            setSelectedTransactionType([...selectedTransactionType]);
        }
    }

    const selectAccount = (account) => {
        if (selectedAccount.includes(account)) {
            const index = selectedAccount.indexOf(account);
            if (index > -1) {
                selectedAccount.splice(index, 1);
                setSelectedAccount([...selectedAccount]);
            }
        } else {
            selectedAccount.push(account);
            setSelectedAccount([...selectedAccount]);
        }
    }

    const selectExpense = (expense) => {
        if (selectedExpense.includes(expense)) {
            const index = selectedExpense.indexOf(expense);
            if (index > -1) {
                selectedExpense.splice(index, 1);
                setSelectedExpense([...selectedExpense]);
            }
        } else {
            selectedExpense.push(expense);
            setSelectedExpense([...selectedExpense]);
        }
    }

    const selectIncome = (income) => {
        if (selectedIncome.includes(income)) {
            const index = selectedIncome.indexOf(income);
            if (index > -1) {
                selectedIncome.splice(index, 1);
                setSelectedIncome([...selectedIncome]);
            }
        } else {
            selectedIncome.push(income);
            setSelectedIncome([...selectedIncome]);
        }
    }

    const handleFilter = () => {
        const filter = {}
        if(selectedTransactionType.length > 0) filter.transactionType = selectedTransactionType
        if(selectedAccount.length > 0) filter.account = selectedAccount
        if(selectedExpense.length > 0) filter.expense = selectedExpense
        if(selectedIncome.length > 0) filter.income = selectedIncome
        dispatch(setFilter(filter))
        dispatch(setFilterTransactionModalStatus(!filterTransactionModalIsActive))
    }

    return (
        <div className='bg-white w-4/12 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-between items-center shadow-md mb-5'>
                <p className='text-slate-500 pl-5 font-bold'>Filter Transaction</p>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5'>
                <div>
                    <div className='pt-5 border-b '>

                        <p className='text-slate-500'>Əməliyyat növü</p>
                        <div className='flex gap-5 py-3'>
                            <button
                                className={classNames('px-2', 'outline outline-1', 'outline-red-500', 'rounded', 'text-red-500',
                                    {
                                        'bg-red-500': selectedTransactionType.includes(2),
                                        'text-white': selectedTransactionType.includes(2)
                                    }
                                )}
                                onClick={() => { selectTransaction(2) }}>Xərc</button>
                            <button className={classNames('px-2', 'outline outline-1', 'outline-green-500', 'rounded', 'text-green-500',
                                {
                                    'bg-green-500': selectedTransactionType.includes(1),
                                    'text-white': selectedTransactionType.includes(1)
                                }
                            )}
                                onClick={() => { selectTransaction(1) }}>Gəlir</button>
                            <button className={classNames('px-2', 'outline outline-1', 'outline-slate-500', 'rounded', 'text-slate-500',
                                {
                                    'bg-slate-500': selectedTransactionType.includes(3),
                                    'text-white': selectedTransactionType.includes(3)
                                }
                            )}
                                onClick={() => { selectTransaction(3) }}>Köçürmə</button>
                        </div>
                    </div>

                    <div className='pt-5 border-b '>
                        <p className='text-slate-500'>Hesablar</p>
                        <div className='flex gap-5 py-3'>
                            {
                                accounts &&
                                Object.keys(accounts).map((category, index) => (
                                    <button
                                        key={index}
                                        style={{
                                            outlineColor: accounts[category].color,
                                            color: selectedAccount.includes(category) ? 'white' : accounts[category].color,
                                            backgroundColor: selectedAccount.includes(category) ? accounts[category].color : 'white'
                                        }}
                                        className={classNames('px-2', 'outline', 'outline-1', 'rounded')}
                                        onClick={() => { selectAccount(category) }}>
                                        {accounts[category].name}
                                    </button>
                                ))
                            }

                        </div>
                    </div>

                    <div className='pt-5 border-b '>
                        <p className='text-slate-500'>Xercler</p>
                        <div className='flex gap-5 py-3'>
                            {
                                expenses &&
                                Object.keys(expenses).map((category, index) => (
                                    <button
                                        key={index}
                                        style={{
                                            outlineColor: expenses[category].color,
                                            color: selectedExpense.includes(category) ? 'white' : expenses[category].color,
                                            backgroundColor: selectedExpense.includes(category) ? expenses[category].color : 'white'
                                        }}
                                        className={classNames('px-2', 'outline', 'outline-1', 'rounded')}
                                        onClick={() => { selectExpense(category) }}>
                                        {expenses[category].name}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    <div className='pt-5'>
                        <p className='text-slate-500'>Glirler</p>
                        <div className='flex gap-5 py-3'>
                            {
                                incomes &&
                                Object.keys(incomes).map((category, index) => (
                                    <button
                                        key={index}
                                        style={{
                                            outlineColor: incomes[category].color,
                                            color: selectedIncome.includes(category) ? 'white' : incomes[category].color,
                                            backgroundColor: selectedIncome.includes(category) ? incomes[category].color : 'white'
                                        }}
                                        className={classNames('px-2', 'outline', 'outline-1', 'rounded')}
                                        onClick={() => { selectIncome(category) }}>
                                        {incomes[category].name}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    <button className='bg-green-500 rounded w-full py-2 text-white font-bold mt-8 tracking-widest' onClick={handleFilter}>Filter</button>
                </div>
            </div>
        </div>
    )
}

export default FilterTransactionModal