import { AiOutlineArrowDown } from 'react-icons/Ai';
import { TbCurrencyManat } from 'react-icons/Tb';

function Income({income}) {
    return (
        <div className='flex gap-2 items-center'>
            <div>
                <AiOutlineArrowDown size={25} className='text-green-500 bg-slate-50 rounded-full p-1' />
            </div>
            <div className='flex flex-col'>
                <p className='text-slate-200'>Income</p>
                <div className='flex text-white'>
                    <p >{income}</p>
                    <TbCurrencyManat size={20} />
                </div>
            </div>
        </div>
    )
}

export default Income