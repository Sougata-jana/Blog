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
    <div>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost