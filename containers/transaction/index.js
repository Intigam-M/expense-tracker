import Transaction from '@/components/transactionPage';

function TransactionContainer() {
    return (
        <div className='flex flex-col gap-2'>
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
        </div>
    )
}

export default TransactionContainer