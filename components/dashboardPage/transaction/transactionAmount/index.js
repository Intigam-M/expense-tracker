import { TbCurrencyManat } from 'react-icons/Tb';

function TransactionAmount() {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center'>
                <p className='text-red-600'>250.00</p>
                <TbCurrencyManat size={15} className='text-red-600' />
            </div>
            <div>
                <p className='text-stone-400'>04.08.2023</p>
            </div>
        </div>
    )
}

export default TransactionAmount