import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Game from './Game.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import Results from './Results'
 
const route = createBrowserRouter([{
  path:'/',
  element:<Home/>
},{
  path:'/game',
  element:<Game/>
},{
  path:'/results',
  element:<Results/>
}]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route}>
    </RouterProvider>
  </React.StrictMode>,
)
