import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Passwordrecovery from "./pages/passwordrecovery";
import { InitPage } from "./pages/initpage";
import Passwordupdate from "./pages/passwordupdate";
import Loginpage from "./pages/loginpage";
import Registerpage from "./pages/registerpage";
const router =createHashRouter([
  {
    basename: "/ToDoNotes"
  },
  {
    path:"/", 
    element:<Loginpage />,
  },
  {
    path:"/register", 
    element:<Registerpage />,
  },
  {
    path:"/passwordrecovery", 
    element:<Passwordrecovery />,
  },
  {
    path:"/init", 
    element:<InitPage />,
  },
  {
    path:"/passwordupdate", 
    element:<Passwordupdate/>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
