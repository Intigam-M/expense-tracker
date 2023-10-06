import BalanceCard from '@/components/dashboardLayout/balanceCard';
import NavigateButtons from '@/components/dashboardLayout/navigateLinks';

function Dashboardlayout({ children }) {
    return (
        <div className='flex flex-col gap-5'>
            <BalanceCard />
            <NavigateButtons />
            {children}
        </div>
    )
}

export default Dashboardlayout