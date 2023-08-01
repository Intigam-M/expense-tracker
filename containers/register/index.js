'use client'
import { register } from '@/app/firebase'
import { useState } from 'react'

function RegisterContainer() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await register(email, password)
        console.log(user)
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className='py-5 font-bold'>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}  className='border p-2'/> <br />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} className='border p-2 mt-4'/> <br />
                <button disabled={!email || !password} className='py-2 px-4 bg-blue-700 text-white mt-4 w-full'>Register</button>
            </form>
        </div>
    )
}

export default RegisterContainer