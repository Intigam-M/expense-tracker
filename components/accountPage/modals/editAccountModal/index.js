'use client'
import { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setEditAccountModalStatus } from '@/store/modal'

function EditAccountModal() {
    const [name, setName] = useState('')
    const [balance, setBalance] = useState(0)
    const editAccountModalIsActive = useSelector(state => state.modal.editAccount)
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(setEditAccountModalStatus(!editAccountModalIsActive))
    }

    return (
        <div className='bg-white w-4/12 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-end'>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5'>
                <div>
                    <form>
                        <label className="text-sm text-slate-500">Növ</label>
                        <select  defaultValue={'DEFAULT'} className="bg-gray-50 border border-gray-300 text-sm rounded w-full p-2.5">
                            <option value="DEFAULT">Müntəzəm</option>
                            <option value="CA">Borc</option>
                        </select>

                        <label className='text-sm text-slate-500'>Ad</label>
                        <input type="text" className='p-1.5 border rounded w-full' value={name} onChange={e => setName(e.target.value)} />

                        <p className='text-sm text-slate-500'>Balans</p>
                        <input type="number" className='p-1.5 border rounded w-full' value={balance} onChange={e => setBalance(e.target.value)} />


                        <button className=' py-2 w-full bg-green-500 rounded mt-5 text-white font-bold'>Daxil et</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditAccountModal