import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Game from './Game.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const route = createBrowserRouter([{
  path:'/',
  element:<Home/>
}]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route}>
    </RouterProvider>
  </React.StrictMode>,
)
