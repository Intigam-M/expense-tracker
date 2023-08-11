import { TbCurrencyManat } from 'react-icons/Tb';
import { FaWallet } from 'react-icons/fa'

function Income() {
    return (
        <div className='flex flex-col items-center bg-slate-300 rounded-md p-2 border shadow'>
            <p className='text-slate-700'>Salary</p>
            <div className='rounded-full bg-orange-500 p-3'>
                <FaWallet className='text-xl text-white' />
            </div>
            <div>
                <div className='flex items-center text-green-600 font-medium'>
                    <p>100.00</p>
                    <TbCurrencyManat />
                </div>
            </div>
        </div>
    )
}

export default Income