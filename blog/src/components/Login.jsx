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
    <div 
    className='flex items-center justify-center w-full'>
      <div 
      className={`w-full mx-auto p-10 max-w-lg bg-gray-100 rounded-xl border-black/10`}>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>  
             <Logo/>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
          </h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
         </p>
         {error && <p className='textt-red-500 mt-8 text-center'> {error} </p>}
         <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5 text-black'>
          <Input
          label='Email'
          placeholder='Enter your email'
          type='email'
          {...register("email" ,{
            required:true,
            validate:{
              matchPatern:(value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) ||"Email address must be a valid address",

            }
          })}
          />
          <div className='space-y-5 text-black'>
          <Input
          label="password:"
          placeholder="Enter your password"
          type="password"
          {...register("password",{
            required:true,
          }
          )}
           className='shadow-2xs'/>

          </div>
          <Button
          type='submit'
          className='w-full bg-gray-700 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-black/80 transition-all duration-200'
          >Sgin in</Button>
          </div>
         </form>
      </div>
    </div>
  )
}

export default Login