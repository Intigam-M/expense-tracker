import BalanceCard from '@/components/dashboardLayout/balanceCard';
import NavigateButtons from '@/components/dashboardLayout/navigateLinks';
import DateFilter from '@/components/dashboardLayout/dateFilter';

function Dashboardlayout({ children }) {
    return (
        <div className='flex flex-col gap-2'>
            <BalanceCard />
            <DateFilter />
            <NavigateButtons />
            {children}
        </div>
    )
}

export default Dashboardlayout