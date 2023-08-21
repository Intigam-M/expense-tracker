import React from 'react'
import { useDispatch } from 'react-redux'
import { closeExpenseModal} from '@/store/modal'
 
function Backdrop() {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(closeExpenseModal())
    }

  return (
    <div className='bg-black opacity-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen' onClick={handleClick}></div>
  )
}

export default Backdrop