'use client'
import { useState, useEffect } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateIncomeCategoryModalStatus } from '@/store/modal'
import { incomeIconList } from "@/lib/icon"
import IconWithProps from '@/components/global/IconWithProps'
import { pushData, updateData, listenForDataUpdates, deleteData } from '@/app/firebase'

function UpdateIncomeCategoryModal({ categoryId }) {
    const [name, setName] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('');
    const [color, setColor] = useState('#ff471a')
    const updateIncomeCategoryModalIsActive = useSelector(state => state.modal.updateIncomeCategory)
    const userId = useSelector(state => state.auth.user.uid)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!categoryId) return
        listenForDataUpdates('user/' + userId + '/incomeCategory/' + categoryId, (data) => {
            setName(data?.name);
            setSelectedIcon(data?.icon);
            setColor(data?.color);
        })
    }, []);

    const closeModal = () => {
        dispatch(setUpdateIncomeCategoryModalStatus(!updateIncomeCategoryModalIsActive))
    }

    const updateIncomeCategory = async () => {

        if (!name.trim() || !selectedIcon || !color) {
            toast.error('Bütün xanaları doldurun')
            return
        }

        const newCategory = {
            name: name,
            icon: selectedIcon,
            color: color
        };

        if (categoryId) {
            updateData(newCategory, 'user/' + userId + '/incomeCategory/' + categoryId)
        } else {
            pushData(newCategory, 'user/' + userId + '/incomeCategory')
        }
        dispatch(setUpdateIncomeCategoryModalStatus(!updateIncomeCategoryModalIsActive))
    }

    const deleteIncomeCategory = () => {
        deleteData('user/' + userId + '/incomeCategory/' + categoryId)
        dispatch(setUpdateIncomeCategoryModalStatus(!updateIncomeCategoryModalIsActive))
    }


    return (
        <div className='bg-white w-4/12 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-between items-center shadow-md mb-5'>
                <p className='text-slate-500 pl-5 font-bold'>{categoryId ? "Edit" : "Add"} income Category</p>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5'>

                <div>
                    <p className='text-sm text-slate-500'>Ad</p>
                    <input type="text" className='p-1.5 border rounded w-full' value={name} onChange={e => setName(e.target.value)} />
                    <label className='text-sm text-slate-500 mt-2'>Icon</label>
                    <div className='border flex flex-wrap p-1 gap-2'>
                        {incomeIconList.map((iconName) => (
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

                    <button className=' py-2 w-full bg-green-500 rounded mt-5 text-white font-bold'onClick={updateIncomeCategory}>{categoryId ? "Update" : "Insert"}</button>
                </div>
            </div>
            {
                categoryId &&
                <div className='border-t mt-2 py-5 px-5'>
                    <button className=' py-2 w-full bg-red-500 rounded text-white font-bold' onClick={deleteIncomeCategory}>Delete Income</button>
                </div>
            }
        </div>
    )
}

export default UpdateIncomeCategoryModal