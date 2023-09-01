'use client'
import { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setAddExpenseCategoryModalStatus } from '@/store/modal'
import { pushData, updateData, listenForDataUpdates } from '@/app/firebase'
import IconWithProps from '@/components/global/IconWithProps'
import toast from "react-hot-toast";
import { expenseIconList } from "@/lib/icon"
import { setEditExpenseSubCategoryModalStatus } from '@/store/modal'
import { setEditExpenseSubCategory } from '@/store/editExpenseSubCategory'

function AddExpenseCategoryModal({ categoryId }) {
    const [name, setName] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('');
    const [color, setColor] = useState('#ff471a')
    const [subCategory, setSubCategory] = useState({})
    const [subCategoryInput, setSubCategoryInput] = useState('')
    const addExpenseCategoryModalIsActive = useSelector(state => state.modal.addExpenseCategory)
    const userId = useSelector(state => state.auth.user.uid)
    const dispatch = useDispatch()


    useEffect(() => {
        if (!categoryId) return
        listenForDataUpdates('user/' + userId + '/expenseCategory/' + categoryId, (data) => {
            setName(data.name);
            setSelectedIcon(data.icon);
            setColor(data.color);
            setSubCategory(data.subCategory);
        })
    }, []);


    const closeModal = () => {
        dispatch(setAddExpenseCategoryModalStatus(!addExpenseCategoryModalIsActive))
    }

    const addExpenseCategory = async () => {

        if (!name.trim() || !selectedIcon || !color) {
            toast.error('Bütün xanaları doldurun')
            return
        }

        const newCategory = {
            name: name,
            icon: selectedIcon,
            color: color,
            subCategory: {
                ...subCategory
            }
        };

        if (categoryId) {
            updateData(newCategory, 'user/' + userId + '/expenseCategory/' + categoryId)
        } else {
            pushData(newCategory, 'user/' + userId + '/expenseCategory')
        }
        dispatch(setAddExpenseCategoryModalStatus(!addExpenseCategoryModalIsActive))
    }

    const addSubCategory = () => {
        if (!subCategoryInput.trim()) {
            toast.error('Xananı doldurun')
            return
        }

        if (categoryId) {
            pushData(subCategoryInput, 'user/' + userId + '/expenseCategory/' + categoryId + '/subCategory')
        } else {
            const uniqueId = Math.random().toString(36).substr(2, 9)
            setSubCategory(prev => {
                return {
                    ...prev,
                    [uniqueId]: subCategoryInput
                }
            })
        }
        setSubCategoryInput('')
    }

    const editSubCategory = (index) => {

        if (categoryId) {
            dispatch(setEditExpenseSubCategory({ categoryId, subCategoryId: index, subCategoryName: subCategory[index] }))
            dispatch(setEditExpenseSubCategoryModalStatus(true))
            dispatch(setAddExpenseCategoryModalStatus(!addExpenseCategoryModalIsActive))
        } else {

            setSubCategory(prev => {
                const newSubCategory = { ...prev }
                delete newSubCategory[index]
                return newSubCategory
            })
        }
    }

    return (
        <div className='bg-white w-4/12 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-between items-center shadow-md mb-5'>
                <p className='text-slate-500 pl-5 font-bold'>Add expense Category</p>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5'>

                <div>
                    <label className='text-sm text-slate-500'>Ad</label>
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

                    <label className='text-sm text-slate-500 mt-2'>Alt kateqoriya əlavə et</label>
                    <div className='flex'>
                        <input type="text" className='p-1.5 border rounded' value={subCategoryInput} onChange={e => setSubCategoryInput(e.target.value)} />
                        <button className='bg-yellow-500 text-white px-4 rounded ml-2' onClick={addSubCategory}>Əlavə et</button>
                    </div>
                    <ul className='flex gap-1 mt-3'>
                        {subCategory && Object.keys(subCategory).map((item, index) => (
                            <li key={index} title='Delete subcategory'
                                className='text-white font-medium border px-2 rounded bg-red-400 cursor-pointer'
                                onClick={() => editSubCategory(item)}>{subCategory[item]}</li>
                        ))}
                    </ul>

                    <button className=' py-2 w-full bg-green-500 rounded mt-5 text-white font-bold' onClick={addExpenseCategory}>{categoryId ? "Update" : "Insert"}</button>

                </div>
            </div>
        </div>
    )
}

export default AddExpenseCategoryModal