'use client'
import Transaction from '@/components/transactionPage';
import { MdAddCircle } from 'react-icons/md'
import { listenForDataUpdates } from "@/app/firebase"
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { setUpdateTransactionModalStatus } from '@/store/modal'
import { useDispatch } from 'react-redux'
import Backdrop from "@/components/global/backdrop"
import UpdateTransactionModal from '@/components/transactionPage/modals/updateModal';

function TransactionContainer() {

    const [transactions, setTransactions] = useState()
    const userId = useSelector(state => state.auth.user.uid)
    const updateTransactionModalIsActive = useSelector(state => state.modal.updateTransaction)
    const [editTransactionId, setEditTransactionId] = useState()
    const dispatch = useDispatch()


    useEffect(() => {
        listenForDataUpdates('user/' + userId + '/transaction', (data) => {
            setTransactions(data)
        })
    }, [])


    const handleTransactionClick = (transaction) => {
        setEditTransactionId(transaction)
        dispatch(setUpdateTransactionModalStatus(!updateTransactionModalIsActive))
    }


    return (
        <div >

            {updateTransactionModalIsActive &&
                <>
                    <Backdrop />
                    <UpdateTransactionModal transactionId={editTransactionId} transactions={transactions}/>
                </>

            }



            <div className='flex flex-col gap-2 w-4/12 mx-auto'>
                {transactions && Object.keys(transactions).map((transaction, index) => {
                    return <Transaction key={index} transaction={transactions[transaction]} onClick={() => handleTransactionClick(transaction)} />
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