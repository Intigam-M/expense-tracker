import { TbCurrencyManat } from 'react-icons/Tb';
import { FiDollarSign } from 'react-icons/Fi';
import { useEffect, useState } from 'react';
import { listenForDataUpdates } from "@/app/firebase"
import { useSelector } from 'react-redux';
import * as ReactIcons from 'react-icons/fa';


function Transaction({ transaction, onClick }) {

    const [account, setAccount] = useState('')
    const [category, setCategory] = useState('')
    const userId = useSelector(state => state.auth.user.uid)
    const Icon = ReactIcons[category?.icon];


    useEffect(() => {
        listenForDataUpdates('user/' + userId + '/account/' + transaction.account, (data) => {
            setAccount(data)
        })

        if (transaction.transactionType == 1) {
            listenForDataUpdates('user/' + userId + '/incomeCategory/' + transaction.category, (data) => {
                setCategory(data)
            })
        } else if (transaction.transactionType == 2) {
            listenForDataUpdates('user/' + userId + '/expenseCategory/' + transaction.category, (data) => {
                setCategory(data)
            })
        }else if (transaction.transactionType == 3) {
            listenForDataUpdates('user/' + userId + '/account/' + transaction.category, (data) => {
                setCategory(data)
            })
        }


    }, [transaction])

    const divStyle = {
        backgroundColor: category?.color
    };


    return (
        <div className='cursor-pointer' onClick={onClick}>
            <div className='flex justify-center'>
                <div className='w-full border'>
                    <div className='w-full rounded-lg px-5 py-2 bg-white flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <div className='rounded-full p-3' style={divStyle}>
                                {
                                    Icon && <Icon size={25} className='text-xl text-white' />
                                }
                            </div>
                            <div>
                                <p className='font-medium'>{category?.name}</p>
                                <p className='text-sm text-slate-400'>{account?.name}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center'>
                                <p
                                    className={`font-medium ${transaction.transactionType === 1 ? "text-green-600" : transaction.transactionType === 2 ? "text-red-600" : "text-slate-600"
                                        }`}
                                >{transaction.amount}</p>
                                {
                                    transaction.currency == 1 ?
                                        <TbCurrencyManat size={15} className={`font-medium ${transaction.transactionType === 1 ? "text-green-600" : transaction.transactionType === 2 ? "text-red-600" : "text-slate-600"
                                    }`} /> :
                                        <FiDollarSign size={15} className={`font-medium ${transaction.transactionType === 1 ? "text-green-600" : transaction.transactionType === 2 ? "text-red-600" : "text-slate-600"
                                    }`} />
                                }
                            </div>
                            <div>
                                <p className='text-stone-400'>{new Date(transaction.date).toLocaleDateString('tr-TR')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction