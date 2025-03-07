import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router'
import { Router } from './routes/index.routes.jsx'


// const router = createBrowserRouter([
//   // {
//   //   path : "/",
//   //   element : <MainLayout />,
//   // },
//   {
//     path: "/menu",
//     element:  <App /> 
//   },
//   {
//     path: "/conta",
//     element:  <ContaPage /> 
//   },
 
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router/>
  </StrictMode>
)
