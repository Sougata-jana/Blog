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
            <div className='w-full min-h-screen py-8 mt-4 text-center' style={{ background: '#f5f5f5' }}>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold text-gray-700 font-sans'>
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen py-8 mt-4 text-center' style={{ background: '#f5f5f5' }}>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard  {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default HomePage