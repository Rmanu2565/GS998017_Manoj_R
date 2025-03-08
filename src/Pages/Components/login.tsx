import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    let credentials = {
        email: "manu@gmail.com",
        password: "Manu@123"
    }
    const [data, setData] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const handleLogin = () => {
        if (credentials.email == data.email && credentials.password == data.password) {
            console.log("first")
            localStorage.setItem("login", "true")
            navigate("/store")
        }
    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                    <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={data?.email}
                            onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                        <input
                            type="text"
                            value={data?.password}
                            onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" onClick={(e) => { handleLogin() }}>Login</button>
                </div>
            </div>
        </>
    )
}

export default Login