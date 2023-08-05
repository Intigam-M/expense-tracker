import Account from '@/components/accountPage';

function AccountContainer() {
    return (
        <div className='flex flex-col gap-4'>
            <Account />
            <Account />
            <Account />
            <Account />
        </div>
    )
}

export default AccountContainer