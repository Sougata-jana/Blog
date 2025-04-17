import React, {useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


export default function Protected({children, authntication=true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state=>state.auth.status)

    useEffect(()=>{

        // if(authStatus === true){
        //     navigate('/')
        // }else(authStatus === false){
        //     navigate('/login')
        // }

        if(authntication && authStatus !== authntication){
            navigate('/login')
        } else if(!authntication && authStatus !== authntication){
            navigate('/')
        }
        setLoader(false)
    },[authStatus, authntication, navigate])

  return loader ? <h1>Loding...</h1> : <>{children}</>
}
