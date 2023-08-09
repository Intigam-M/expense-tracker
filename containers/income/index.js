import React from 'react'
import Income from '@/components/incomePage';

function IncomeContainer() {
    return (
        <div className='w-4/12 mx-auto grid grid-cols-4 gap-3 '>
            <Income />
            <Income />
            <Income />
            <Income />
        </div>
    )
}

export default IncomeContainer