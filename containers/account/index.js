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
    const userId = useSelector(state => state.auth.user.uid)
    const dispatch = useDispatch()


    useEffect(() => {
        listenForDataUpdates('user/' + userId + '/account', (data) => {
            setAccountCategory(data)
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
            {transferModalIsActive && <TransferModal categoryId={transferAccountCategoryId} />}

            <div className='flex flex-col gap-4'>

                {accountCategory && Object.keys(accountCategory).map((item, index) => {
                    return (
                        <Account
                            key={index}
                            category={accountCategory[item]}
                            handleEditClick={() => handleEditClick(item)}
                            handleTransferClick={() => handleTransferClick(item)} />
                    )
                })}

                <div className='flex justify-end sticky bottom-0 w-6/12  mx-auto pb-5 pr-5 '>
                    <button onClick={handleAddClick}>
                        <MdAddCircle className='text-7xl text-green-400' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AccountContainer