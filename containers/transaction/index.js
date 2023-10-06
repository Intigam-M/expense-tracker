'use client'
import Transaction from '@/components/transactionPage';
import { listenForDataUpdates } from "@/app/firebase"
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUpdateTransactionModalStatus, setFilterTransactionModalStatus } from '@/store/modal'
import Backdrop from "@/components/global/backdrop"
import UpdateTransactionModal from '@/components/transactionPage/modals/updateModal';
import FilterTransactionModal from '@/components/transactionPage/modals/filterModal';
import { GiSettingsKnobs } from 'react-icons/gi'
import { VscSettings } from 'react-icons/vsc'
function TransactionContainer() {

    const [transactions, setTransactions] = useState()
    const userId = useSelector(state => state.auth.user.uid)
    const updateTransactionModalIsActive = useSelector(state => state.modal.updateTransaction)
    const filterTransactionModalIsActive = useSelector(state => state.modal.filterTransaction)
    const [editTransactionId, setEditTransactionId] = useState()
    const date = useSelector(state => state.date)
    const dispatch = useDispatch()


    useEffect(() => {
        listenForDataUpdates('user/' + userId + '/transaction', (data) => {
            if (!data) return
            Object.keys(data).map((transaction) => {
                if (new Date(data[transaction].date).getMonth() !== date.month ||
                    new Date(data[transaction].date).getFullYear() !== date.year) {
                    delete data[transaction]
                }
            })

            setTransactions(data)
        })
    }, [date])


    const handleTransactionClick = (transaction) => {
        setEditTransactionId(transaction)
        dispatch(setUpdateTransactionModalStatus(!updateTransactionModalIsActive))
    }

    const handleFilterClick = () => {
        dispatch(setFilterTransactionModalStatus(!filterTransactionModalIsActive))
    }


    return (
        <div >
            {(updateTransactionModalIsActive || filterTransactionModalIsActive) && <Backdrop />}
            {updateTransactionModalIsActive && <UpdateTransactionModal transactionId={editTransactionId} transactions={transactions} />}
            {filterTransactionModalIsActive && <FilterTransactionModal />}
            <div className='flex flex-col gap-2 w-4/12 mx-auto'>
                {transactions && Object.keys(transactions).map((transaction, index) => {
                    return <Transaction key={index} transaction={transactions[transaction]} onClick={() => handleTransactionClick(transaction)} />
                })}
            </div>

            <div className='flex justify-end sticky bottom-0 w-5/12 mx-auto pb-5' onClick={handleFilterClick}>
                <button>
                    <VscSettings className='text-5xl text-white bg-green-400 rounded-full p-2' />
                </button>
            </div>


        </div>
    )
}

export default TransactionContainer