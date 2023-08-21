'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiMiniArrowsRightLeft } from 'react-icons/hi2'
import { HiMiniArrowSmallDown } from 'react-icons/hi2'
import { HiMiniArrowSmallUp } from 'react-icons/hi2'
import { FaWallet } from 'react-icons/fa'

function NavigateButtons() {
    const pathname = usePathname()

    return (
        <div className='flex justify-center sticky top-0'>
            <div className=' w-4/12 border border-stone-400 rounded-lg'>
                <div className='grid grid-cols-4'>

                    <Link
                        href="/dashboard"
                        className={`${pathname=='/dashboard' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'} border-r border-stone-400 py-1 px-2 rounded-l-lg  font-medium text-center flex items-center gap-1`}>
                        <HiMiniArrowsRightLeft className={`${pathname=='/dashboard' ? 'text-white' : 'text-slate-500'}text-3xl`} />
                        <p>Transaction</p>
                    </Link>
                    <Link
                        href="/dashboard/expense"
                        className={`${pathname=='/dashboard/expense' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'} border-r border-stone-400 py-1 px-3 font-medium text-center flex items-center`}>
                        <HiMiniArrowSmallUp className='text-3xl text-red-500' />
                        <p>Expense</p>
                    </Link>
                    <Link
                        href="/dashboard/income"
                        className={`${pathname=='/dashboard/income' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'} border-r border-stone-400 py-1 px-3 font-medium text-center flex items-center`}>
                        <HiMiniArrowSmallDown className='text-3xl text-green-500' />
                        <p>Income</p>
                    </Link>
                    <Link
                        href="/dashboard/account"
                        className={`${pathname=='/dashboard/account' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'} py-1 px-3 rounded-r-lg font-medium text-center flex items-center gap-2`}>
                        <FaWallet className='text-xl text-yellow-600' />
                        <p>Account</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavigateButtons