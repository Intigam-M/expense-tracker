'use client'
import { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setEditExpenseModalStatus } from '@/store/modal'
import { getData } from "@/app/firebase"
import { expenseIconList } from "@/lib/icon"
import IconWithProps from '@/components/global/IconWithProps'

function EditExpenseModal({ categoryId }) {
    const [name, setName] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('');
    const [color, setColor] = useState('#ff471a')
    const editExpenseModalIsActive = useSelector(state => state.modal.editExpense)
    const userId = useSelector(state => state.auth.user.uid)
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(setEditExpenseModalStatus(!editExpenseModalIsActive))
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(userId + '/expenseCategory/' + categoryId);
            setName(data.name);
            setSelectedIcon(data.icon);
            setColor(data.color);
        };

        fetchData();
    }, []);



    return (
        <div className='bg-white w-4/12 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-between items-center shadow-md mb-5'>
                <p className='text-slate-500 pl-5 font-bold'>Edit expense Category</p>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5'>

                <div>
                    <form>
                        <p className='text-sm text-slate-500'>Ad</p>
                        <input type="text" className='p-1.5 border rounded w-full' value={name} onChange={e => setName(e.target.value)} />

                        <label className='text-sm text-slate-500 mt-2'>Icon</label>
                        <div className='border flex flex-wrap p-1 gap-2'>
                            {expenseIconList.map((iconName) => (
                                <IconWithProps
                                    key={iconName}
                                    iconName={iconName}
                                    selectedIcon={selectedIcon}
                                    onClick={() => setSelectedIcon(iconName)}
                                />
                            ))}

                        </div>


                        <label className='text-sm text-slate-500 mt-2'>Color</label>
                        <input type="color" className='p-1.5 border rounded w-full' value={color} onChange={e => setColor(e.target.value)} />


                        <button className=' py-2 w-full bg-green-500 rounded mt-5 text-white font-bold'>Daxil et</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditExpenseModal