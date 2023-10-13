'use client'
import { useSelector } from 'react-redux'


function DateFilter() {
    const date = useSelector(state => state.date)
    const startDate = new Date(date.startDate).toLocaleDateString("tr-TR")
    const endDate = new Date(date.endDate).toLocaleDateString("tr-TR")

    return (
        <div className='flex justify-center'>
            <div className='w-4/12 flex gap-2 justify-center text-sky-900 font-medium'>
                <p>{startDate}</p>
                <p>-</p>
                <p>{endDate}</p>
            </div>
        </div>
    )
}

export default DateFilter