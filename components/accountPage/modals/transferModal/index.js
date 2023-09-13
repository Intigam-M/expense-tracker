'use client'
import { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setTransferModalStatus } from '@/store/modal'
import { pushData, getData, listenForDataUpdates } from '@/app/firebase'
import toast from "react-hot-toast";

function TransferModal({ accounts, categoryId }) {
    const [amount, setAmount] = useState('')
    const [fromSelectedAccount, setFromSelectedAccount] = useState(categoryId)
    const [toSelectedAccount, setToSelectedAccount] = useState('')
    const [note, setNote] = useState('')
    const [date, setDate] = useState('')
    const transferModalIsActive = useSelector(state => state.modal.transfer)
    const [currency , setCurrency] = useState('')
    const userId = useSelector(state => state.auth.user.uid)
    const dispatch = useDispatch()

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().substr(0, 10);
        setDate(formattedDate);
    }, []);

    const closeModal = () => {
        dispatch(setTransferModalStatus(!transferModalIsActive))
    }


    const handleSelectAccount = (e) => {
        setToSelectedAccount(e.target.value)
        async function  getCurrency() {
            const data = await getData('user/' + userId + '/account/' + e.target.value)
            setCurrency(data.currency)
        }
        getCurrency()
    }



    const handleTransfer = () => {
        if (amount == '' || toSelectedAccount == '') return toast.error('Məlumatları tam doldurun')
        const incomeData = {
            amount: amount,
            account: fromSelectedAccount,
            category: toSelectedAccount,
            transactionType: 3,
            currency: currency,
            note: note,
            date: date
        }
        pushData(incomeData, 'user/' + userId + '/transaction')
        toast.success('Əlavə edildi')
        dispatch(setTransferModalStatus(!transferModalIsActive))

    }



    return (
        <div className='bg-white w-4/12 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-end'>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5'>
                <div className='grid grid-cols-2'>
                    <div className='p-3 bg-red-500 text-white rounded-tl rounded-bl'>

                        <p className='text-xs pl-1'>Hesabdan:</p>
                        <select value={fromSelectedAccount} onChange={(e) => { setFromSelectedAccount(e.target.value) }} className="bg-red-500 text-white text-xl font-medium block w-full border-none focus:outline-none">
                            {
                                accounts && Object.keys(accounts).map((category, index) => {
                                    return (
                                        <option key={index} value={category}>{accounts[category].name}</option>
                                    )
                                })
                            }
                        </select>

                    </div>
                    <div className='p-3 bg-blue-500 text-white rounded-tr rounded-br'>
                        <p className='text-xs pl-1'>Hesaba:</p>
                        <select value={toSelectedAccount}  onChange={handleSelectAccount} className="bg-blue-500 text-white text-xl font-medium block w-full border-none focus:outline-none">
                            <option value=''>Hesab seçin</option>
                            {
                                accounts && Object.keys(accounts).map((category, index) => {
                                    return (
                                        <option key={index} value={category}>{accounts[category].name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div>
                    <div className='mt-5'>
                        <p className='text-sm text-slate-500'>Köçürülən məbləğ</p>
                        <input type="number" className='p-1.5 border rounded w-full' value={amount} onChange={e => setAmount(e.target.value)} />

                        <p className='text-sm text-slate-500'>Qeyd</p>
                        <input type="text" className='p-1.5 border rounded w-full' value={note} onChange={e => setNote(e.target.value)} />

                        <p className='text-sm text-slate-500'>Tarix</p>
                        <input type="date" className='p-1.5 border rounded w-full' value={date} onChange={e => setDate(e.target.value)} />

                        <button className=' py-2 w-full bg-green-500 rounded mt-5 text-white font-bold' onClick={handleTransfer}>Daxil et</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransferModal