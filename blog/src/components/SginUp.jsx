import React,{useState} from 'react'
import authservice from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Link } from 'react-router-dom'
import {Button, Logo, Input } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function SginUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit}= useForm()
    const [error, setError]= useState("")

    const create = async(data)=>{
        setError("")
        if (!data.password){
            setError("Password is required")
            return
        }
        try {
            const userData = await authservice.createAccount(data)
            if (userData) {
                const userData = await authservice.getCurrentUser()
                if (userData) dispatch(login(userData))
                    navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
   <div className="w-full min-h-screen flex items-center justify-center" style={{ background: '#f5f5f5' }}>
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
    <div className="mb-6 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
    </div>
    <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-2">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-gray-500 mb-6">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:underline"
                >
                    Sign In
                </Link>
                </p>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="space-y-6">
                    <div>
                        <label className="block font-bold mb-2 text-gray-800 text-lg">Name</label>
                        <Input
                            placeholder="Enter your name"
                            className="border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-black px-4 py-2 text-base"
                            {...register('name',{
                                required: true,
                            })}
                        />
                    </div>
                    <div>
                        <label className="block font-bold mb-2 text-gray-800 text-lg">Email</label>
                        <Input
                            placeholder='Enter your email'
                            type='email'
                            className="border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-black px-4 py-2 text-base"
                            {...register("email" ,{
                                required:true,
                                validate:{
                                    matchPatern:(value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) ||"Email address must be a valid address",
                                }
                            })}
                        />
                    </div>
                    <div>
                        <label className="block font-bold mb-2 text-gray-800 text-lg">Password</label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            className="border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-black px-4 py-2 text-base"
                            {...register('password',{
                                required: true,
                            })}
                        />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow hover:bg-blue-700 transition-all duration-200 border-none outline-none text-lg">
                        Sign Up
                    </Button>
                </form>
    </div>
   </div>
  )
}

export default SginUp