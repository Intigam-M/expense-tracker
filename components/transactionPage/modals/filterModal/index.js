'use client'
import { useState, useEffect, use } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterTransactionModalStatus } from '@/store/modal'
import { updateData, listenForDataUpdates, deleteData, getData } from '@/app/firebase'
import toast from "react-hot-toast";
import classNames from 'classnames'


function FilterTransactionModal() {

    const userId = useSelector(state => state.auth.user.uid)
    const filterTransactionModalIsActive = useSelector(state => state.modal.filterTransaction)
    const [endDate, setEndDate] = useState('')
    const [startDate, setstartDate] = useState('')
    const [accounts, setAccounts] = useState()
    const [expenses, setExpenses] = useState()
    const [incomes, setIncomes] = useState()

    const [selectedAccount, setSelectedAccount] = useState([])
    const [selectedExpense, setSelectedExpense] = useState([])
    const [selectedIncome, setSelectedIncome] = useState([])
    const [selectedTransaction, setSelectedTransaction] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().substr(0, 10);
        setEndDate(formattedDate);

        // select current month first day
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
        const formattedFirstDay = firstDay.toISOString().substr(0, 10);
        setstartDate(formattedFirstDay);

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
        const currentSelection = selectedTransaction;
        if (currentSelection.includes(transactionId)) {
            const index = currentSelection.indexOf(transactionId);
            if (index > -1) {
                currentSelection.splice(index, 1);
                setSelectedTransaction([...currentSelection]);
            }
        } else {
            currentSelection.push(transactionId);
            setSelectedTransaction([...currentSelection]);
        }
    }

    const selectAccount = (account) => {
        const currentSelection = selectedAccount;
        if (currentSelection.includes(account)) {
            const index = currentSelection.indexOf(account);
            if (index > -1) {
                currentSelection.splice(index, 1);
                setSelectedAccount([...currentSelection]);
            }
        } else {
            currentSelection.push(account);
            setSelectedAccount([...currentSelection]);
        }
    }

    const selectExpense = (expense) => {
        const currentSelection = selectedExpense;
        if (currentSelection.includes(expense)) {
            const index = currentSelection.indexOf(expense);
            if (index > -1) {
                currentSelection.splice(index, 1);
                setSelectedExpense([...currentSelection]);
            }
        } else {
            currentSelection.push(expense);
            setSelectedExpense([...currentSelection]);
        }
    }

    const selectIncome = (income) => {
        const currentSelection = selectedIncome;
        if (currentSelection.includes(income)) {
            const index = currentSelection.indexOf(income);
            if (index > -1) {
                currentSelection.splice(index, 1);
                setSelectedIncome([...currentSelection]);
            }
        } else {
            currentSelection.push(income);
            setSelectedIncome([...currentSelection]);
        }
    }



    useEffect(() => {
        console.log(selectedTransaction)
        console.log(selectedAccount)
        console.log(selectedExpense)
    }, [selectedTransaction])


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
                    <div className='mt-5'>
                        <p className='text-sm text-slate-500'>Tarixden</p>
                        <input type="date" className='p-1.5 border rounded w-full' value={startDate} onChange={e => setDate(e.target.value)} />

                        <p className='text-sm text-slate-500'>Tarixe</p>
                        <input type="date" className='p-1.5 border rounded w-full' value={endDate} onChange={e => setDate(e.target.value)} />
                    </div>
                    <div className='pt-5 border-b '>

                        <p className='text-slate-500'>Əməliyyat növü</p>
                        <div className='flex gap-5 py-3'>
                            <button
                                className={classNames('px-2', 'outline outline-1', 'outline-red-500', 'rounded', 'text-red-500',
                                    {
                                        'bg-red-500': selectedTransaction.includes(2),
                                        'text-white': selectedTransaction.includes(2)
                                    }
                                )}
                                onClick={() => { selectTransaction(2) }}>Xərc</button>
                            <button className={classNames('px-2', 'outline outline-1', 'outline-green-500', 'rounded', 'text-green-500',
                                {
                                    'bg-green-500': selectedTransaction.includes(1),
                                    'text-white': selectedTransaction.includes(1)
                                }
                            )}
                                onClick={() => { selectTransaction(1) }}>Gəlir</button>
                            <button className={classNames('px-2', 'outline outline-1', 'outline-slate-500', 'rounded', 'text-slate-500',
                                {
                                    'bg-slate-500': selectedTransaction.includes(3),
                                    'text-white': selectedTransaction.includes(3)
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

                    <button className='bg-green-500 rounded w-full py-2 text-white font-bold mt-8 tracking-widest'>Filter</button>
                </div>
            </div>
        </div>
    )
}

export default FilterTransactionModal