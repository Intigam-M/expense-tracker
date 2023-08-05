import BalanceCard from '@/components/dashboardLayout/balanceCard';
import NavigateButtons from '@/components/dashboardLayout/navigateLinks';
import Footer from '@/components/footer';
import Header from '@/components/header';

function Dashboardlayout({ children }) {
    return (
        <div className='flex flex-col gap-5'>
            <Header />
            <BalanceCard />
            <NavigateButtons />
            {children}
            <Footer />
        </div>
    )
}

export default Dashboardlayout