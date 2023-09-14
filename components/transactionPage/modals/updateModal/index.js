'use client'
import { useState, useEffect } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateTransactionModalStatus } from '@/store/modal'
import { updateData, listenForDataUpdates, deleteData, getData } from '@/app/firebase'
import toast from "react-hot-toast";


function UpdateTransactionModal({ transactionId, transactions }) {
    const [amount, setAmount] = useState(transactions[transactionId].amount)

    const [expenseOrIncomeCategory, setExpenseOrIncomeCategory] = useState('')
    const [selectedExpenseOrIncome, setSelectedExpenseOrIncome] = useState(transactions[transactionId].category)

    const [accountCategory, setAccountCategory] = useState()
    const [selectedAccount, setSelectedAccount] = useState(transactions[transactionId].account)
    const [subCategories, setSubCategories] = useState(transactions[transactionId].subCategory)
    const [selectedSubCategory, setSelectedSubCategory] = useState('')
    const [currency, setCurrency] = useState(transactions[transactionId].currency)
    const [note, setNote] = useState(transactions[transactionId].note)
    const [date, setDate] = useState(transactions[transactionId].date)
    const userId = useSelector(state => state.auth.user.uid)
    const updateTransactionModalIsActive = useSelector(state => state.modal.updateTransaction)
    const [transactionType, setTransactionType] = useState(transactions[transactionId].transactionType)
    const dispatch = useDispatch()

    console.log(transactions[transactionId].subCategory)

    useEffect(() => {
        listenForDataUpdates('user/' + userId + '/account', (data) => {
            setAccountCategory(data)
        })


        if (transactionType == 2) {
            listenForDataUpdates('user/' + userId + '/expenseCategory', (data) => {
                setExpenseOrIncomeCategory(data)
            })
        } else if (transactionType == 1) {

            listenForDataUpdates('user/' + userId + '/incomeCategory', (data) => {
                setExpenseOrIncomeCategory(data)
            })
        }

    }, []);


    const closeModal = () => {
        dispatch(setUpdateTransactionModalStatus(!updateTransactionModalIsActive))
    }

    const updateTransaction = async () => {

        if (amount == '') {
            toast.error('Bütün xanaları doldurun')
            return
        }

        const newTransactionData = {
            amount: amount,
            category: selectedExpenseOrIncome,
            account: selectedAccount,
            subCategory: selectedSubCategory,
            note: note,
            date: date,
            currency: currency
        };

        updateData(newTransactionData, 'user/' + userId + '/transaction/' + transactionId)
        toast.success('Əməliyyat uğurla yeniləndi')
        dispatch(setUpdateTransactionModalStatus(!updateTransactionModalIsActive))
    }

    const deleteTransaction = () => {
        deleteData('user/' + userId + '/transaction/' + transactionId)
        toast.success('Əməliyyat uğurla silindi')
        dispatch(setUpdateTransactionModalStatus(!updateTransactionModalIsActive))
    }



    const handleSelectAccount = (e) => {
        setSelectedAccount(e.target.value)
        async function getCurrency() {
            const data = await getData('user/' + userId + '/account/' + e.target.value)
            setCurrency(data.currency)
        }
        getCurrency()
    }

    return (
        <div className='bg-white w-4/12 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-between items-center shadow-md mb-5'>
                <p className='text-slate-500 pl-5 font-bold'>
                    {transactionType == 1 ? 'Gəlir' : transactionType == 2 ? 'Xərc' : 'Transfer'}
                </p>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5'>
                <div className='grid grid-cols-2'>
                    <div className='p-3 bg-red-500 text-white rounded-tl rounded-bl'>
                        <p className='text-xs pl-1'>
                            {
                                transactionType == 1 ? 'Hesaba:' : transactionType == 2 ? 'Hesabdan:' : 'Transfer edən hesab:'
                            }
                        </p>
                        <select value={selectedAccount} onChange={handleSelectAccount} className="bg-red-500 text-white text-xl font-medium  block w-full border-none focus:outline-none">
                            {
                                accountCategory && Object.keys(accountCategory).map((account, index) => {
                                    return (
                                        <option key={index} value={account}>{accountCategory[account].name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='p-3 bg-blue-500 text-white rounded-tr rounded-br'>
                        <p className='text-xs pl-1'>
                            {
                                transactionType == 1 ? 'Kateqoriyadan:' : transactionType == 2 ? 'Kateqoriyaya:' : 'Alan hesab:'
                            }
                        </p>
                        <select value={selectedExpenseOrIncome} onChange={(e) => { setSelectedExpenseOrIncome(e.target.value) }} className="bg-blue-500 text-white text-xl font-medium block w-full border-none focus:outline-none">
                            {
                                expenseOrIncomeCategory && Object.keys(expenseOrIncomeCategory).map((category, index) => {
                                    return (
                                        <option key={index} value={category}>{expenseOrIncomeCategory[category].name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>


                    <ul className='flex gap-1 mt-3'>
                        {subCategories && Object.keys(subCategories).map((item, index) => (
                            <li key={index} title='Select subcategy'
                                onClick={() => selectSubcategory(item)}
                                className={`text-white font-medium border px-2 rounded  cursor-pointer 
                                ${selectedSubCategory == item ? ' bg-green-500' : 'bg-red-500'}`}
                            >{subCategories[item]}</li>
                        ))}
                    </ul>

                </div>
                <div>
                    <div className='mt-5'>
                        <p className='text-sm text-slate-500'>Məbləğ xərc</p>
                        <input type="number" className='p-1.5 border rounded w-full' value={amount} onChange={e => setAmount(e.target.value)} />

                        <p className='text-sm text-slate-500'>Qeyd</p>
                        <input type="text" className='p-1.5 border rounded w-full' value={note} onChange={e => setNote(e.target.value)} />

                        <p className='text-sm text-slate-500'>Tarix</p>
                        <input type="date" className='p-1.5 border rounded w-full' value={date} onChange={e => setDate(e.target.value)} />

                        <button className=' py-2 w-full bg-green-500 rounded mt-5 text-white font-bold'
                            onClick={updateTransaction}
                        >Update</button>
                        <button className=' py-2 w-full bg-red-500 rounded mt-5 text-white font-bold'
                            onClick={deleteTransaction}
                        >Delete Transaction</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateTransactionModal