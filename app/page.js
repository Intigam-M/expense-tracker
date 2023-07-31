'use client'

import { register } from './firebase'
import { useState } from 'react'


function HomePage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await register(email, password)
        console.log(user)
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <button disabled={!email || !password}>Register</button>
            </form>
        </div>
    )
}

export default HomePage