'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logout } from '@/app/firebase'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeUser } from '@/store/auth'
import { MdLogout } from 'react-icons/md'

function Navigator() {

    const { user } = useSelector(state => state.auth)
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await logout()
        dispatch(removeUser())
    }

    useEffect(() => {
        if (!user) {
            router.replace('/login')
        }
    }, [user]);
    return (
        <nav className='pl-6'>
            <div className='flex items-center'>
                <MdLogout className='text-white' size={20} />
                <button onClick={handleLogout} className='p-2 text-white font-medium rounded'>Logout</button>
            </div>
        </nav>
    )
}

export default Navigator