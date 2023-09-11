'use client'
import Income from '@/components/incomePage';
import { MdAddCircle } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import Backdrop from "@/components/global/backdrop"
import UpdateIncomeCategoryModal from "@/components/incomePage/incomeModals/updateIncomeCategoryModal"
import AddIncomeModal from "@/components/incomePage/incomeModals/addIncomeModal"
import { setUpdateIncomeCategoryModalStatus, setAddIncomeModalStatus } from '@/store/modal'
import { FiEdit2 } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { listenForDataUpdates } from "@/app/firebase"

function IncomeContainer() {
    const dispatch = useDispatch()
    const updateIncomeCategoryModalIsActive = useSelector(state => state.modal.updateIncomeCategory)
    const addIncomeModalIsActive = useSelector(state => state.modal.addIncome)
    const [editIsactive, setEditIsActive] = useState(false)
    const [incomeCategory, setIncomeCategory] = useState()
    const userId = useSelector(state => state.auth.user.uid)
    const [editIncomeCategoryId, setEditIncomeCategoryId] = useState()
    const [transaction, setTransaction] = useState('')


    useEffect(() => {
        listenForDataUpdates('user/' + userId + '/incomeCategory', (data) => {
            setIncomeCategory(data)
        })


        listenForDataUpdates('user/' + userId + '/transaction', (data) => {
            setTransaction(data)
        })

    }, [])

    const handleAddClick = () => {
        setEditIncomeCategoryId(null)
        dispatch(setUpdateIncomeCategoryModalStatus(!updateIncomeCategoryModalIsActive))
    }

    const handleEditClick = () => {
        setEditIsActive(!editIsactive)
    }

    const handleIncomeClick = (categoryId) => {
        setEditIncomeCategoryId(categoryId)
        if (editIsactive) {
            dispatch(setUpdateIncomeCategoryModalStatus(!updateIncomeCategoryModalIsActive))
        } else {
            dispatch(setAddIncomeModalStatus(!addIncomeModalIsActive))
        }
    }


    return (
        <div>
            {(updateIncomeCategoryModalIsActive || addIncomeModalIsActive) && <Backdrop />}
            {updateIncomeCategoryModalIsActive && <UpdateIncomeCategoryModal categoryId={editIncomeCategoryId} />}
            {addIncomeModalIsActive && <AddIncomeModal categories={incomeCategory} categoryId={editIncomeCategoryId} />}
            <div className="w-4/12 mx-auto ">
                <div className="flex justify-end mb-1 gap-2">
                    <FiEdit2 title="Düzəliş et" size={35} className={`text-2xl text-white p-2 rounded cursor-pointer ${editIsactive ? "bg-red-500" : "opacity-40 bg-red-400"} `} onClick={handleEditClick} />
                    <MdAddCircle title="Xərc əlavə et" size={35} className='text-2xl text-white p-2 bg-green-500 rounded cursor-pointer' onClick={handleAddClick} />
                </div>

                <div className='grid grid-cols-4 gap-3 '>
                    {incomeCategory && Object.keys(incomeCategory).map((item, index) => {
                        return (
                            <Income key={index} category={incomeCategory[item]} categoryId={item} transaction={transaction} onClick={() => handleIncomeClick(item)} />
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default IncomeContainer