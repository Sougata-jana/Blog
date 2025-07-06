import React from 'react'
import { Container, PostForm } from '../components'

function Addpost() {
  return (
    <div className='w-full min-h-screen py-8 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center'>
      <Container>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center font-sans'>Add New Post</h2>
        <PostForm />
      </Container>
    </div>
  )
}

export default Addpost