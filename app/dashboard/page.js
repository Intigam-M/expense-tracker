import DashboardContainer from '@/containers/dashboard'
import Header from "@/components/header"
import Footer from "@/components/footer"

function DashboardPage() {
    return (
        <div>
            <Header />
            <DashboardContainer />
            <Footer />
        </div>
    )
}

export default DashboardPage