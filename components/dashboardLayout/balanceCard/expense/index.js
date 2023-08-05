import { AiOutlineArrowUp } from 'react-icons/Ai';
import { TbCurrencyManat } from 'react-icons/Tb';

function Expense() {
    return (
        <div className='flex gap-2 items-center'>
            <div>
                <AiOutlineArrowUp size={25} className='text-red-500 bg-slate-50 rounded-full p-1' />
            </div>
            <div className='flex flex-col'>
                <p className='text-slate-200'>Expenses</p>
                <div className='flex text-white'>
                    <p >250.00</p>
                    <TbCurrencyManat size={20} />
                </div>
            </div>
        </div>
    )
}

export default Expense