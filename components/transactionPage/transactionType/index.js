import { PiShoppingCartDuotone } from 'react-icons/Pi';

function TransactionType() {
    return (
        <div className='flex gap-2 items-center'>
            <div>
                <PiShoppingCartDuotone size={40} className='bg-yellow-300 text-blue-600 p-2 rounded-full' />
            </div>
            <div>
                <p className='font-medium'>Shopping</p>
            </div>
        </div>
    )
}

export default TransactionType