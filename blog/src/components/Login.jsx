import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Logo, Input } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import  authservice  from '../appwrite/auth'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register, handleSubmit}= useForm()
  const [error, setError]= React.useState("")

  const login = async(data)=>{
    setError("")
    try {
   const session = await authservice.login(data)
   if (session) {
    const userData = await authservice.getCurrentUser()
    if (userData) dispatch(authLogin(userData))
    navigate('/')
   }
    } catch (error) {
     setError(error.message)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center" style={{ background: '#f5f5f5' }}>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
        <div className='mb-6 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>  
             <Logo/>
          </span>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-2">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-500 mb-6">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className='text-red-500 mb-4 text-center'> {error} </p>}
        <form onSubmit={handleSubmit(login)} className='space-y-6'>
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
              placeholder="Enter your password"
              type="password"
              className="border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-black px-4 py-2 text-base"
              {...register("password",{
                required:true,
              })}
            />
          </div>
          <Button
            type='submit'
            className='w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow hover:bg-blue-700 transition-all duration-200 border-none outline-none text-lg'
          >Sign in</Button>
        </form>
      </div>
    </div>
  )
}

export default Login