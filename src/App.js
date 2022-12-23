import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Products from './pages/Products/Products';
import Success from './pages/Success/Success';
import Singleorder  from './pages/singleOrder/Singleorder.jsx';
import Register from './pages/Authentication/Register'
import Login from './pages/Authentication/Login'

import './app.scss'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home />
  },
  {
    path:"/products",
    element:<Products/>
  },
  {
    path:"/products/:id",
    element:<Products/>
  },
  {
    path:"/product/:id",
    element:<Product />
  },
  {
    path:"/success",
    element:<Success />
  },
  {
    path:"/Singleorder/:id",
    element:<Singleorder/>
  },{
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  }
  
])
const App = () => {
  return (
    <div className='app'>
        <RouterProvider router={router} />
   </div>
  )
}

export default App