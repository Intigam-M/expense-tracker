import Account from '@/components/accountPage';
import { MdAddCircle } from 'react-icons/md';

function AccountContainer() {
    return (
        <div className='flex flex-col gap-4'>
            <Account />
            <Account />
            <Account />
            <Account />
            <div className='flex justify-end sticky bottom-0 w-6/12  mx-auto pb-5 pr-5 '>
                <button>
                    <MdAddCircle className='text-7xl text-green-400' />
                </button>
            </div>
        </div>
    )
}

export default AccountContainer