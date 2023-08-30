'use client'
import { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setAddExpenseCategoryModalStatus } from '@/store/modal'
import * as ReactIcons from 'react-icons/fa';
import { setData, getData } from '@/app/firebase'

function AddExpenseCategoryModal() {
    const [name, setName] = useState('')
    const [icon, setIcon] = useState('')
    const [color, setColor] = useState('#ff471a')
    const addExpenseCategoryModalIsActive = useSelector(state => state.modal.addExpenseCategory)
    const userId = useSelector(state => state.auth.user.uid)
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(setAddExpenseCategoryModalStatus(!addExpenseCategoryModalIsActive))
    }
    

    const addExpense = async (e) => {
        e.preventDefault()

        const expenseCategory = await getData(userId + '/expenseCategory')

        const data = [...expenseCategory,{
            id: expenseCategory.length + 1,
            name: name,
            icon: icon,
            color: color,
            subCategory: []
        }]

        setData(data, userId + '/expenseCategory')
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
                        <label className='text-sm text-slate-500'>Ad</label>
                        <input type="text" className='p-1.5 border rounded w-full' value={name} onChange={e => setName(e.target.value)} />

                        <label className='text-sm text-slate-500 mt-2'>Icon</label>
                        <div className='border flex flex-wrap p-1 gap-2'>
                            <ReactIcons.FaHome size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaHome')} />
                            <ReactIcons.FaShoppingBasket size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaShoppingBasket')} />
                            <ReactIcons.FaShoppingCart size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaShoppingCart')} />
                            <ReactIcons.FaCar size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaCar')} />
                            <ReactIcons.FaBeer size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaBeer')} />
                            <ReactIcons.FaBriefcaseMedical size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaBriefcaseMedical')} />
                            <ReactIcons.FaCapsules size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaCapsules')} />
                            <ReactIcons.FaChild size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaChild')} />
                            <ReactIcons.FaCocktail size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaCocktail')} />
                            <ReactIcons.FaGasPump size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaGasPump')} />
                            <ReactIcons.FaGlassCheers size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaGlassCheers')} />
                            <ReactIcons.FaHeart size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaHeart')} />
                            <ReactIcons.FaIceCream size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaIceCream')} />
                            <ReactIcons.FaLaptop size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaLaptop')} />
                            <ReactIcons.FaPaintRoller size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaPaintRoller')} />
                            <ReactIcons.FaCircle size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaCircle')} />
                            <ReactIcons.FaTshirt size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaTshirt')} />
                            <ReactIcons.FaWrench size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaWrench')} />
                            <ReactIcons.FaBaby size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaBaby')} />
                            <ReactIcons.FaAppleAlt size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaAppleAlt')} />
                            <ReactIcons.FaArrowUp size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaArrowUp')} />
                            <ReactIcons.FaGift size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaGift')} />
                            <ReactIcons.FaPhoneAlt size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaPhoneAlt')} />
                            <ReactIcons.FaSpa size={50} className='text-slate-500 border rounded bg-slate-100 p-2 cursor-pointer' onClick={() => setIcon('FaSpa')} />


                        </div>

                        <label className='text-sm text-slate-500 mt-2'>Color</label>
                        <input type="color" className='p-1.5 border rounded w-full' value={color} onChange={e => setColor(e.target.value)} />

                        <button className=' py-2 w-full bg-green-500 rounded mt-5 text-white font-bold' onClick={addExpense}>Daxil et</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddExpenseCategoryModal