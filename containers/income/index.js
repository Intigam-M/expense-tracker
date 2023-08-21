import React from 'react'
import Income from '@/components/incomePage';
import { MdAddCircle } from 'react-icons/md'

function IncomeContainer() {
    return (
        <div className='w-4/12 mx-auto grid grid-cols-4 gap-3 '>
            <Income />
            <Income />
            <Income />
            <Income />
            <Income />
            <div className='flex justify-center'>
                <button>
                    <MdAddCircle className='text-7xl text-green-400' />
                </button>
            </div>
        </div>
    )
}

export default IncomeContainer