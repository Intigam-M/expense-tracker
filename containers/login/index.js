'use client'
import { login } from '@/app/firebase'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/auth'

function LoginContainer() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await login(email, password)
        if (user) {
            router.replace('/')
            dispatch(setUser(user))
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className='py-5 font-bold'>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} className='border p-2' /> <br />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} className='border p-2 mt-4' /> <br />
                <button disabled={!email || !password} className='py-2 px-4 bg-blue-700 text-white mt-4 w-full'>Login</button>
            </form>
        </div>
    )
}

export default LoginContainer