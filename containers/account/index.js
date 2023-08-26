'use client'
import Account from '@/components/accountPage';
import { MdAddCircle } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { setAddAccountModalStatus } from '@/store/modal';
import AddAccountModal from '@/components/accountPage/modals/addAccountModal';
import EditAccountModal from '@/components/accountPage/modals/editAccountModal';
import TransferModal from '@/components/accountPage/modals/transferModal';
import Backdrop from '@/components/global/backdrop';


function AccountContainer() {

    const addAccountModalIsActive = useSelector(state => state.modal.addAccount)
    const editAccountModalIsActive = useSelector(state => state.modal.editAccount)
    const transferModalIsActive = useSelector(state => state.modal.transfer)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setAddAccountModalStatus(!addAccountModalIsActive))
    }

    return (
        <div>
            {(addAccountModalIsActive || editAccountModalIsActive || transferModalIsActive) && <Backdrop />}
            {addAccountModalIsActive && <AddAccountModal />}
            {editAccountModalIsActive && <EditAccountModal />}
            {transferModalIsActive && <TransferModal />}
            
            <div className='flex flex-col gap-4'>
                <Account />
                <Account />
                <Account />
                <Account />
                <div className='flex justify-end sticky bottom-0 w-6/12  mx-auto pb-5 pr-5 '>
                    <button onClick={handleClick}>
                        <MdAddCircle className='text-7xl text-green-400' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AccountContainer