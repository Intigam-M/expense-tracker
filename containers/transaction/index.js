'use client'
import Transaction from '@/components/transactionPage';
import { MdAddCircle } from 'react-icons/md'
import { listenForDataUpdates } from "@/app/firebase"
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function TransactionContainer() {

    const [transactions, setTransactions] = useState()
    const userId = useSelector(state => state.auth.user.uid)


    useEffect(() => {
        listenForDataUpdates('user/' + userId + '/transaction', (data) => {
            setTransactions(data)
        })
    }, [])



    return (
        <div >
            <div className='flex flex-col gap-2 w-4/12 mx-auto'>
                {transactions && Object.keys(transactions).map((transaction, index) => {
                    return <Transaction key={index} transaction={transactions[transaction]} />
                })

                }
            </div>

            <div className='flex justify-end sticky bottom-0 w-6/12  mx-auto pb-5 pr-5 '>
                <button>
                    <MdAddCircle className='text-7xl text-green-400' />
                </button>
            </div>

        </div>
    )
}

export default TransactionContainer