import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter } from 'react-router-dom'
import Login from './components/Login.jsx'
import { Authlayout } from './components/index.js'
import { RouterProvider } from 'react-router'
import HomePage from './page/HomePage.jsx'
import SginUp from './components/SginUp.jsx'
import AllPost from './page/AllPost.jsx'
import Addpost from './page/AddPost.jsx'
import EditPost from './page/EditPost.jsx'
import Post from './page/Post.jsx'
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children:[
        {
          path:'/',
          element:<HomePage/>
        },
        {
          path:'/login',
          element:(
            <Authlayout authntication={false} >
              <Login/>
            </Authlayout>
          )
        },
        {
          path:'/signup',
          element:(
            <Authlayout authntication={false} >
              <SginUp/>
            </Authlayout>
          )
        },
        {
          path:'/all-post',
          element:(
            <Authlayout authntication>
              {" "}
              <AllPost/>
            </Authlayout>
          )
        },
        {
          path:'/add-post',
          element:(
            <Authlayout authntication>
              {""}
              <Addpost/>
            </Authlayout>
          )
        },
        {
          path:'/edit-post/:slug',
          element:(
            <Authlayout authntication>
              <EditPost/>
            </Authlayout>
          )
        },
        {
          path:'/post/:slug',
          element:(
            <Authlayout authntication>
              <Post/>
            </Authlayout>
          )
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
