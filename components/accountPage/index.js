import { TbCurrencyManat } from 'react-icons/Tb';
import * as ReactIcons from 'react-icons/fa';
import { FaRightLong } from 'react-icons/fa6'
import { FiEdit2 } from 'react-icons/fi'
import { useEffect, useState } from 'react';
import { updateData } from '@/app/firebase'
import { useSelector } from 'react-redux';


function Account({ category, categoryId, transaction, handleEditClick, handleTransferClick }) {

    const [categoryBalance, setCategoryBalance] = useState(0)
    const userId = useSelector(state => state.auth.user.uid)
    const AccountIcon = ReactIcons[category.icon];


    const IconBackground = {
        backgroundColor: category.color
    };

    useEffect(() => {
        let balance = Number(category.initialBalance)

        transaction && Object.keys(transaction).map((item, index) => {
            if (transaction[item].account === categoryId) {
                if (transaction[item].transactionType === 1) {
                    balance += Number(Number(transaction[item].amount))
                } else if (transaction[item].transactionType === 2) {
                    balance -= Number(transaction[item].amount)
                } else if (transaction[item].transactionType === 3) {
                    balance -= Number(transaction[item].amount)
                }
            }

            if (transaction[item].category == categoryId && transaction[item].transactionType === 3) {
                balance += Number(transaction[item].amount)
            }

        })
        setCategoryBalance(balance)

        if (balance != category.balance) {
            updateData({ balance: balance }, 'user/' + userId + '/account/' + categoryId)
        }

    }, [transaction, category])


    return (
        <div className='flex justify-center'>
            <div className='w-4/12 flex gap-3 items-center border border-slate-300 shadow p-2 bg-slate-100 rounded'>
                <div>
                    <AccountIcon className='text-5xl text-white p-3 rounded' style={IconBackground} />
                </div>
                <div className='flex flex-col w-1/2'>
                    <div>
                        <p className='font-medium text-slate-700'>{category.name}</p>
                    </div>
                    <div>
                        <div className='flex items-center font-medium gap-3'>
                            <div className='flex items-center'>
                                <p className='text-green-600'>{categoryBalance}</p>
                                <TbCurrencyManat className='text-green-600' />
                            </div>
                            {category.creditLimit !== 0 &&
                                <div className='flex items-center'>
                                    <p className='text-red-600'>{category.creditLimit}</p>
                                    <TbCurrencyManat className='text-red-600' />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='w-1/2 flex justify-end gap-2'>
                    <FiEdit2 title="Düzəliş et" size={35} className='text-2xl text-white p-2 bg-red-400 rounded cursor-pointer' onClick={handleEditClick} />
                    <FaRightLong title="Köçürmə" size={35} className='text-2xl text-white p-2 bg-sky-400 rounded cursor-pointer' onClick={handleTransferClick} />
                </div>
            </div>
        </div>
    )
}

export default Account