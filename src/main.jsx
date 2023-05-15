import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Game from './Game.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import Results from './Results'
import UserContextProvider from './context/UsernameContext'
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
    <UserContextProvider>
      <RouterProvider router={route}>
      </RouterProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
