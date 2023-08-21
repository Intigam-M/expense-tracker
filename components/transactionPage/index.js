import TransactionType from './transactionType';
import TransactionAmount from './transactionAmount';

function Transaction() {
    return (
        <div>
            <div className='flex justify-center'>
                <div className='w-full border'>
                    <div className='w-full rounded-lg px-5 py-2 bg-white flex justify-between items-center'>
                        <TransactionType />
                        <TransactionAmount />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction