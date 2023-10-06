import React from 'react'
import Navigator from '@/components/sidebar/navigator';

function Sidebar() {
    return (
        <aside className='w-2/12 border-r border-stone-400 bg-gradient-to-t from-sky-900 via-sky-950 to-gray-900'>
            <div className='py-8 flex justify-center'>
                <h1 className='text-white font-bold text-xl tracking-wider'>Expense tracker</h1>
            </div>
            <Navigator />
        </aside>
    )
}

export default Sidebar