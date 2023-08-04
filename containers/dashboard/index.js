import BalanceCard from '@/components/dashboardPage/balanceCard';
import Transaction from '@/components/dashboardPage/transaction';

function DashboardContainer() {
    return (
        <div className='flex flex-col gap-5'>
            <BalanceCard />
            <div className='flex flex-col gap-2'>
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
            </div>
        </div>
    )
}

export default DashboardContainer