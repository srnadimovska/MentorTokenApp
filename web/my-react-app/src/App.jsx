
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Error from './pages/Error'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardMentor from './pages/DashboardMentor'
import DashboardStartup from './pages/DashboardStartup'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      
    ],
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/register',
    element:<Register />
  },
  {
    path:'/dashboardMentor',
    element:<DashboardMentor />
  },
  {
    path:'/dashboardStartup',
    element:<DashboardStartup />
  },
  
]);

function App() {
  return <RouterProvider router={router} />
    
}


export default App
