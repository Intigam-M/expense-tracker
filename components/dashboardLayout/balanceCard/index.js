import Expense from '@/components/dashboardLayout/balanceCard/expense';
import Income from '@/components/dashboardLayout/balanceCard/income';
import Balance from '@/components/dashboardLayout/balanceCard/balance';

function BalanceCard() {
    return (
        <div className='flex justify-center'>
            <div className='w-4/12 border bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded-xl'>
                <div className='flex flex-col items-center gap-5'>
                    <p className='font-bold text-white text-2xl'>Total balance</p>
                    <Balance />
                    <div className='flex w-full justify-between'>
                        <Income />
                        <Expense />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BalanceCard