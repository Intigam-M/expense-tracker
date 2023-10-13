'use client'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterDateModalStatus } from '@/store/modal'
import FilterDateModal from './modal/dateFilterModal'
import Backdrop from '@/components/global/backdrop'




function DateFilter() {
    const date = useSelector(state => state.date)
    const startDate = new Date(date.startDate).toDateString('az-AZ').substr(4, 11)
    const endDate = new Date(date.endDate).toDateString('az-AZ').substr(4, 11)
    const filterDateModalIsActive = useSelector(state => state.modal.filterDate)
    const dispatch = useDispatch()


    const handleClick = () => {
        dispatch(setFilterDateModalStatus(!filterDateModalIsActive))
    }

    return (
        <div className='flex justify-center'>
            { filterDateModalIsActive && <Backdrop />}
            {filterDateModalIsActive && <FilterDateModal />}
            <div className='w-4/12 flex gap-2 justify-center text-sky-900 font-medium cursor-pointer' onClick={handleClick}>
                <p>{startDate}</p>
                <p>-</p>
                <p>{endDate}</p>
            </div>
        </div>
    )
}

export default DateFilter