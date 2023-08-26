import { TbCurrencyManat } from 'react-icons/Tb';
import { FaWallet } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { setEditAccountModalStatus, setTransferModalStatus } from '@/store/modal';
import { FaRightLong } from 'react-icons/fa6'
import { FiEdit2 } from 'react-icons/fi'


function Account() {

    const dispatch = useDispatch()
    const editAccountModalIsActive = useSelector(state => state.modal.editAccount)
    const transferModalIsActive = useSelector(state => state.modal.transfer)


    const handleEditClick = () => {
        dispatch(setEditAccountModalStatus(!editAccountModalIsActive))
    }

    const handleTransferClick = () => {
        dispatch(setTransferModalStatus(!transferModalIsActive))
    }


    return (
        <div className='flex justify-center'>
            <div className='w-4/12 flex gap-3 items-center border border-slate-300 shadow p-2 bg-slate-100 rounded'>
                <div>
                    <FaWallet className='text-5xl text-white p-3 bg-sky-800 rounded' />
                </div>
                <div className='flex flex-col w-1/2'>
                    <div>
                        <p className='font-medium text-slate-700'>Kapital bank</p>
                    </div>
                    <div>
                        <div className='flex items-center text-green-600 font-medium'>
                            <p>100.00</p>
                            <TbCurrencyManat />
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