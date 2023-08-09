import { TbCurrencyManat } from 'react-icons/Tb';
import {FaWallet} from 'react-icons/fa'

function Account() {
  return (
    <div className='flex justify-center'>
    <div className='w-4/12 flex gap-3 items-center'>
        <div>
           <FaWallet className='text-5xl text-white p-3 bg-sky-800 rounded' />
        </div>
        <div className='flex flex-col w-full'>
            <div>
                <p className='font-medium text-slate-700'>Kapital bank</p>
            </div>
            <div className='border-b border-stone-400'>
                <div className='flex items-center text-green-600 font-medium'>
                    <p>100.00</p>
                    <TbCurrencyManat />
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Account