import React from 'react'
import service from '../appwrite/confi'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-150 font-sans'>
            <div className='w-full flex justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-lg w-full h-32 object-cover border border-gray-100'/>
            </div>
            <h2 className='text-xl font-bold text-blue-700'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
