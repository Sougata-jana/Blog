import React,{useEffect, useState} from 'react'
import { Container, PostCard } from '../components'
import service from '../appwrite/confi'

function HomePage() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        service.getPosts().then((posts)=>{
            if(posts){
               setPosts(posts)
            }
        })
    },[])

    if (posts.length === 0 ){
        return (
            <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100'>
                <Container>
                    <div className='flex flex-col items-center justify-center min-h-[60vh]'>
                        <h1 className='text-3xl md:text-4xl font-extrabold text-gray-700 mb-4 font-sans'>Welcome to DevUI Blog</h1>
                        <p className='text-lg text-gray-500 mb-6'>Login to read and share amazing posts!</p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen py-8 bg-gradient-to-br from-blue-50 to-blue-100'>
            <Container>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center font-sans'>Latest Posts</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.map((post)=>(
                        <PostCard key={post.$id} {...post}/>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default HomePage