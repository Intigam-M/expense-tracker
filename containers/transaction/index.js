import Transaction from '@/components/transactionPage';
import { MdAddCircle } from 'react-icons/md'

function TransactionContainer() {
    return (
        <div >
            <div className='flex flex-col gap-2 w-4/12 mx-auto'>
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
            </div>

            <div className='flex justify-end sticky bottom-0 w-6/12  mx-auto pb-5 pr-5 '>
                <button>
                    <MdAddCircle className='text-7xl text-green-400' />
                </button>
            </div>

        </div>
    )
}

export default TransactionContainer