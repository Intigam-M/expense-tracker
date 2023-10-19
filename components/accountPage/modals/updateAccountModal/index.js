'use client'
import { useState, useEffect } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateAccountModalStatus } from '@/store/modal'
import { pushData, updateData, listenForDataUpdates, deleteData, getData } from '@/app/firebase'
import toast from "react-hot-toast";
import { accountIconList } from "@/lib/icon"
import IconWithProps from '@/components/global/IconWithProps'
import Swal from 'sweetalert2'

function UpdateAccountModal({ categoryId }) {
    const [name, setName] = useState('')
    const [accountType, setAccountType] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('');
    const [color, setColor] = useState('#ff471a')
    const [balance, setBalance] = useState('')
    const [creditLimit, setCreditLimit] = useState('')
    const [selectedType, setSelectedType] = useState(1)
    const [balanceImpact, setBalanceImpact] = useState(true)
    const [description, setDescription] = useState('')
    const [currency, setCurrency] = useState('')
    const [selectedCurrency, setSelectedCurrency] = useState(1)
    const updateAccountModalIsActive = useSelector(state => state.modal.updateAccount)
    const userId = useSelector(state => state.auth.user.uid)
    const dispatch = useDispatch()

    useEffect(() => {

        // get account type 
        listenForDataUpdates('generalData/accountType', (data) => {
            setAccountType(data);
        })

        // get account currency
        listenForDataUpdates('generalData/currency', (data) => {
            setCurrency(data);
        })


        if (!categoryId) return
        listenForDataUpdates('user/' + userId + '/account/' + categoryId, (data) => {
            setName(data?.name);
            setBalance(data?.balance);
            setDescription(data?.description);
            setSelectedType(data?.type);
            setCreditLimit(data?.creditLimit);
            setBalanceImpact(data?.balanceImpact);
            setSelectedCurrency(data?.currency);
            setSelectedIcon(data?.icon);
            setColor(data?.color);
        })
    }, []);

    const updateAccountCategory = async () => {

        if (!name.trim()) {
            toast.error('Ad boş ola bilməz')
            return
        }

        const newCategory = {
            name: name,
            type: selectedType,
            initialBalance: balance,
            balance: 0,
            creditLimit: creditLimit,
            description: description,
            balanceImpact: balanceImpact,
            currency: selectedCurrency,
            icon: selectedIcon,
            color: color
        };

        if (categoryId) {

            const oldCategoryBalance = await getData('user/' + userId + '/account/' + categoryId)
            const newIntialBalance = Number(oldCategoryBalance.initialBalance) + (Number(balance) - Number(oldCategoryBalance.balance))
            newCategory.initialBalance = newIntialBalance


            updateData(newCategory, 'user/' + userId + '/account/' + categoryId)
        } else {
            pushData(newCategory, 'user/' + userId + '/account')
        }
        dispatch(setUpdateAccountModalStatus(!updateAccountModalIsActive))
    }

    const closeModal = () => {
        dispatch(setUpdateAccountModalStatus(!updateAccountModalIsActive))
    }

    const deleteAccountCategory = () => {

        const deletedTrasactions = []
        getData('user/' + userId + '/transaction').then((data) => {
            Object.keys(data).map((item, index) => {
                if (data[item].account === categoryId || data[item].category === categoryId) {
                    deletedTrasactions.push(item)
                }
            })

            Swal.fire({
                title: `Bu hesab ile elaqeli ${deletedTrasactions.length} emeliyyat silinecek!`,
                showDenyButton: true,
                confirmButtonText: 'Confirm',
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    deletedTrasactions.map((item, index) => {
                        deleteData('user/' + userId + '/transaction/' + item)
                    })
                    deleteData('user/' + userId + '/account/' + categoryId)
                    dispatch(setUpdateAccountModalStatus(!updateAccountModalIsActive))
                }
            })
        })
    }


    return (
        <div className='bg-white w-4/12 absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded'>
            <div className='flex justify-between items-center shadow-md mb-5'>
                <p className='text-slate-500 pl-5 font-bold'>{categoryId ? "Edit" : "Add"} account Category</p>
                <div className='pb-2'>
                    <IoCloseSharp size={30} className='text-2xl cursor-pointer' onClick={closeModal} />
                </div>
            </div>
            <div className='pb-5 px-5'>
                <div>
                    <label className='text-sm text-slate-500'>Ad</label>
                    <input type="text" className='p-1.5 border rounded w-full' value={name} onChange={e => setName(e.target.value)} />

                    <label className="text-sm text-slate-500">Növ</label>
                    <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="bg-gray-50 border border-gray-300 text-sm rounded w-full p-2.5">
                        {
                            accountType && Object.keys(accountType).map((item, index) => {
                                return (
                                    <option key={index} value={item}>{accountType[item].name}</option>
                                )
                            })
                        }
                    </select>

                    <label className='text-sm text-slate-500'>Balans</label>
                    <input type="number" className='p-1.5 border rounded w-full' value={balance} onChange={e => setBalance(e.target.value)} />

                    <label className='text-sm text-slate-500'>Kredit limiti</label>
                    <input type="number" className='p-1.5 border rounded w-full' value={creditLimit} onChange={e => setCreditLimit(e.target.value)} />

                    <label className="text-sm text-slate-500">Pul vahidi</label>
                    <select value={selectedCurrency} onChange={e => setSelectedCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-sm rounded w-full p-2.5">
                        {
                            currency && Object.keys(currency).map((item, index) => {
                                return (
                                    <option key={index} value={item}>{currency[item].name}</option>
                                )
                            })
                        }
                    </select>

                    <label className='text-sm text-slate-500 mt-2'>Icon</label>
                    <div className='border flex flex-wrap p-1 gap-2'>
                        {accountIconList.map((iconName) => (
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

                    <label className='text-sm text-slate-500'>Description</label>
                    <input type="text" className='p-1.5 border rounded w-full' value={description} onChange={e => setDescription(e.target.value)} />

                    <div className='mt-5 flex gap-1'>
                        <input id="balanceImpactCheck" type="checkbox" checked={balanceImpact} onChange={e => setBalanceImpact(!balanceImpact)} />
                        <label htmlFor='balanceImpactCheck' className='text-sm text-slate-500'>Balansa təsir etsin</label>
                    </div>


                    <button className=' py-2 w-full bg-green-500 rounded mt-5 text-white font-bold' onClick={updateAccountCategory}>{categoryId ? "Update" : "Insert"}</button>
                </div>
            </div>
            {
                categoryId &&
                <div className='border-t mt-2 py-5 px-5'>
                    <button className=' py-2 w-full bg-red-500 rounded text-white font-bold' onClick={deleteAccountCategory}>Delete Account</button>
                </div>
            }
        </div>
    )
}

export default UpdateAccountModal