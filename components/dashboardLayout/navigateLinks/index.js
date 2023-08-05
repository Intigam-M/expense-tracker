import Link from 'next/link'

function NavigateButtons() {
    return (
        <div className='flex justify-center'>
            <div className=' w-4/12'>
                <div className='flex gap-4'>
                    <Link href="/dashboard" className='py-2 px-3 bg-yellow-500 rounded-lg text-white'>Transaction</Link>
                    <Link href="/account" className='py-2 px-3 bg-blue-500 rounded-lg text-white'>Account</Link>
                    <Link href="/income" className='py-2 px-3 bg-green-500 rounded-lg text-white'>Income</Link>
                    <Link href="/expense" className='py-2 px-3 bg-red-500 rounded-lg text-white'>Expense</Link>
                </div>
            </div>
        </div>
    )
}

export default NavigateButtons