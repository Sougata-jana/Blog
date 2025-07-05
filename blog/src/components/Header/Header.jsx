import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {

   const authStatus = useSelector((state)=>state.auth.status)
   const navigate = useNavigate()

   const navItems = [
    {
      name:'Home',
      slug:'/',
      active:true
    },
    {
      name:'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name:'Signup',
      slug:'/signup',
      active: !authStatus
    },
    {
      name:'All Posts',
      slug:'/all-post',
      active: authStatus
    },
    {
      name:'Add Post',
      slug:'/add-post',
      active: authStatus
    },

   ]
  return (
    <header className='py-3 shadow-sm bg-white border-b border-gray-200 font-sans'>
    <Container>
      <nav className='flex items-center'>
        <div className='mr-4'>
          <Link to='/'>
          <Logo width='70px'/>
          </Link>
        </div>
        <ul className='flex ml-auto gap-2'>
          {navItems.map((item)=>
          item.active ? (
            <li key={item.name}>
              <button onClick={()=>navigate(item.slug)} className='inline-block px-5 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-150 border-none outline-none'>
                {item.name}
              </button>
            </li>
          ) : null
          )}
          {authStatus && 
          (
            <li>
              <LogoutBtn/>
            </li>
          )
          }
        </ul>
      </nav>
    </Container>
    </header>
  )
}

export default Header