import React, {useEffect, useState }from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/confi'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setpost] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        service.getPost(id).then((post)=>{
            if(post){
                setpost(post)
            }else{
                navigate('/')
            }
        })
    },[id, navigate])
  return post? (
    <div className='w-full min-h-screen py-8 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center'>
      <Container>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center font-sans'>Edit Post</h2>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost