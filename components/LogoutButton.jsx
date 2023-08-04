'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logout } from '@/app/firebase'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeUser } from '@/store/auth'


function LogoutButton() {

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


    return <button onClick={handleLogout}>Logout</button>

}

export default LogoutButton