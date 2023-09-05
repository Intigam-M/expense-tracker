'use client'
import { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setEditExpenseSubCategoryModalStatus, setUpdateExpenseCategoryModalStatus } from '@/store/modal'
import { updateData, deleteData } from "@/app/firebase"



function EditExpenseSubCategoryModal() {
    const [name, setName] = useState('')
    const userId = useSelector(state => state.auth.user.uid)
    const editExpenseSubCategoryModalIsActive = useSelector(state => state.modal.editExpenseSubcategory)
    const updateExpenseCategoryModalIsActive = useSelector(state => state.modal.updateExpenseCategory)
    const editExpenseSubCategory = useSelector(state => state.editExpenseSubCategory)
    const dispatch = useDispatch()

    useEffect(() => {
        setName(editExpenseSubCategory.subCategoryName)
    }, [])


    const closeModal = () => {
        dispatch(setEditExpenseSubCategoryModalStatus(!editExpenseSubCategoryModalIsActive))
        dispatch(setUpdateExpenseCategoryModalStatus(!updateExpenseCategoryModalIsActive))
    }


    const updateSubCategory = () => {
        if (!name.trim()) {
            toast.error('Xananı doldurun')
            return
        }
        updateData({ [editExpenseSubCategory.subCategoryId]: name }, 'user/' + userId + '/expenseCategory/' + editExpenseSubCategory.categoryId + '/subCategory')
        dispatch(setEditExpenseSubCategoryModalStatus(!editExpenseSubCategoryModalIsActive))
        dispatch(setUpdateExpenseCategoryModalStatus(!updateExpenseCategoryModalIsActive))
    }


    const deleteSubCategory = () => {
        deleteData('user/' + userId + '/expenseCategory/' + editExpenseSubCategory.categoryId + '/subCategory/' + editExpenseSubCategory.subCategoryId)
        dispatch(setEditExpenseSubCategoryModalStatus(!editExpenseSubCategoryModalIsActive))
        dispatch(setUpdateExpenseCategoryModalStatus(!updateExpenseCategoryModalIsActive))
    }
    

    return (
        <div className='bg-white w-4/12 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-between items-center shadow-md mb-5'>
                <p className='text-slate-500 pl-5 font-bold'>Edit expense SubCategory</p>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5 border-b'>
                <div>
                    <p className='text-sm text-slate-500'>Ad</p>
                    <input type="text" className='p-1.5 border rounded w-full' value={name} onChange={e => setName(e.target.value)} />

                    <button className=' py-2 w-full bg-green-500 rounded mt-5 text-white font-bold' onClick={updateSubCategory}>Update</button>
                </div>
            </div>
            <div className='px-5 my-5'>
                <button className='py-2 w-full bg-red-500 rounded text-white font-bold' onClick={deleteSubCategory}>Delete subcategory</button>
            </div>
        </div>
    )
}

export default EditExpenseSubCategoryModal