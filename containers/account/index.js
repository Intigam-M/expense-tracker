'use client'
import Account from '@/components/accountPage';
import { MdAddCircle } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import UpdateAccountModal from '@/components/accountPage/modals/updateAccountModal';
import TransferModal from '@/components/accountPage/modals/transferModal';
import Backdrop from '@/components/global/backdrop';
import { useState, useEffect } from 'react';
import { listenForDataUpdates } from "@/app/firebase"
import { setUpdateAccountModalStatus, setTransferModalStatus } from '@/store/modal';

function AccountContainer() {

    const updateAccountModalIsActive = useSelector(state => state.modal.updateAccount)
    const transferModalIsActive = useSelector(state => state.modal.transfer)
    const [editAccountCategoryId, setEditAccountCategoryId] = useState()
    const [transferAccountCategoryId, setTransferAccountCategoryId] = useState()
    const [accountCategory, setAccountCategory] = useState()
    const [transaction, setTransaction] = useState('')
    const userId = useSelector(state => state.auth.user.uid)
    const dispatch = useDispatch()


    useEffect(() => {
        listenForDataUpdates('user/' + userId + '/account', (data) => {
            setAccountCategory(data)
        })
        listenForDataUpdates('user/' + userId + '/transaction', (data) => {
            setTransaction(data)
        })
    }, [])

    const handleAddClick = () => {
        setEditAccountCategoryId(null)
        dispatch(setUpdateAccountModalStatus(!updateAccountModalIsActive))
    }


    const handleEditClick = (categoryId) => {
        setEditAccountCategoryId(categoryId)
        dispatch(setUpdateAccountModalStatus(!updateAccountModalIsActive))
    }


    const handleTransferClick = (categoryId) => {
        setTransferAccountCategoryId(categoryId)
        dispatch(setTransferModalStatus(!transferModalIsActive))
    }


    return (
        <div>
            {(updateAccountModalIsActive || transferModalIsActive) && <Backdrop />}
            {updateAccountModalIsActive && <UpdateAccountModal categoryId={editAccountCategoryId} />}
            {transferModalIsActive && <TransferModal accounts={accountCategory} categoryId={transferAccountCategoryId} />}

            <div className='flex flex-col gap-2 w-4/12 mx-auto'>
                <div className="flex justify-end mb-1 gap-2">
                    <MdAddCircle title="Filter" size={35} className="text-2xl text-white p-1 rounded cursor-pointer bg-green-400" onClick={handleAddClick} />
                </div>

                {accountCategory && Object.keys(accountCategory).map((item, index) => {
                    return (
                        <Account
                            key={index}
                            category={accountCategory[item]}
                            categoryId={item}
                            transaction={transaction}
                            handleEditClick={() => handleEditClick(item)}
                            handleTransferClick={() => handleTransferClick(item)} />
                    )
                })}
            </div>
        </div>
    )
}

export default AccountContainer