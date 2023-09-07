'use client'
import { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setAddIncomeModalStatus } from '@/store/modal'
import toast from "react-hot-toast";
import { pushData, getData, listenForDataUpdates } from '@/app/firebase'

function AddincomeModal({categories, categoryId}) {

    const [amount, setAmount] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(categoryId)
    const [accounts, setAccounts] = useState([{}])
    const [selectedAccount, setSelectedAccount] = useState('')
    const [currency , setCurrency] = useState('')
    const [note, setNote] = useState('')
    const [date, setDate] = useState('')

    const addIncomeModalIsActive = useSelector(state => state.modal.addIncome)
    const userId = useSelector(state => state.auth.user.uid)
    const dispatch = useDispatch()

    useEffect(() => {

        listenForDataUpdates('user/' + userId + '/account', (data) => {
            setAccounts(data)
        })


        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().substr(0, 10);
        setDate(formattedDate);
    }, []);

    const closeModal = () => {
        dispatch(setAddIncomeModalStatus(!addIncomeModalIsActive))
    }

    const handleSelectAccount = (e) => {
        setSelectedAccount(e.target.value)
        async function  getCurrency() {
            const data = await getData('user/' + userId + '/account/' + e.target.value)
            setCurrency(data.currency)
        }
        getCurrency()
    }


    const handleAddIncome = () => {
        if(amount=='' || selectedAccount =='' ) return toast.error('Məlumatları tam doldurun')
        const incomeData = {
            amount: amount,
            account: selectedAccount,
            category: selectedCategory,
            transactionType: 1,
            currency: currency,
            note: note,
            date: date
        }
        pushData(incomeData, 'user/' + userId + '/transaction')
        toast.success('Gəlir əlavə edildi')
        dispatch(setAddIncomeModalStatus(!addIncomeModalIsActive))

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
                        <p className='text-xs pl-1'>Kateqoriyadan:</p>
                        <select value={selectedCategory} onChange={(e)=>{setSelectedCategory(e.target.value)}} className="bg-red-500 text-white text-xl font-medium block w-full border-none focus:outline-none">
                         {
                            categories && Object.keys(categories).map((category, index) => {
                                return (
                                    <option key={index} value={category}>{categories[category].name}</option>
                                )
                            })
                         }
                        </select>

                    </div>
                    <div className='p-3 bg-blue-500 text-white rounded-tr rounded-br'>
                        <p className='text-xs pl-1'>Hesaba:</p>
                        <select value={selectedAccount} onChange={handleSelectAccount} className="bg-blue-500 text-white text-xl font-medium  block w-full border-none focus:outline-none">
                            <option value=''>Hesab seçin</option>
                            {
                                accounts && Object.keys(accounts).map((account, index) => {
                                    return (
                                        <option key={index} value={account}>{accounts[account].name}</option>
                                    )
                                })
                            }
                        </select>

                    </div>
                </div>
                <div>
                    <div className='mt-5'>
                        <p className='text-sm text-slate-500'>Məbləğ gəlir</p>
                        <input type="number" className='p-1.5 border rounded w-full' value={amount} onChange={e => setAmount(e.target.value)} />

                        <p className='text-sm text-slate-500'>Qeyd</p>
                        <input type="text" className='p-1.5 border rounded w-full' value={note} onChange={e => setNote(e.target.value)} />

                        <p className='text-sm text-slate-500'>Tarix</p>
                        <input type="date" className='p-1.5 border rounded w-full' value={date} onChange={e => setDate(e.target.value)} />

                        <button className=' py-2 w-full bg-green-500 rounded mt-5 text-white font-bold'
                              onClick={handleAddIncome}
                        >Daxil et</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddincomeModal