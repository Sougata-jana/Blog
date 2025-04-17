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
        console.log("Submiting data", data);
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
   <div className='flex items-center justify-center'>
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
    </div>
    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5 text-black">
                        <Input
                            label="Name"
                            placeholder="Enter your name"
                            {...register('name',{
                                required: true,
                            })}
                        />
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
                        <Input
                            label="password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register('password',{
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full bg-gray-900 ">
                            Sign Up
                        </Button>
                    </div>
                </form>
    </div>
   </div>
  )
}

export default SginUp