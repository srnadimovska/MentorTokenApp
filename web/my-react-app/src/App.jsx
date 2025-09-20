
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
import MentorDashboard from './pages/MentorDashboard'
import Stats from './pages/Stats'
import JobFeed from './pages/JobFeed'
import StartupDashboard from './pages/StartupDashboard'
import StartupMentors from './pages/StartupMentors'
import StartupJobs from './pages/StartupJobs'



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
    element:<DashboardMentor />,
    children: [
      {index: true, element: <MentorDashboard/>},
      {path: 'mystats', element: <Stats />},
      {path: 'jobsfeed', element: <JobFeed />},
    ]
  },
  {
    path:'/dashboardStartup',
    element:<DashboardStartup />,
    children: [
      {index: true, element:<StartupDashboard/>},
      {path: 'mymentors',element:<StartupMentors/>},
      {path:'jobs',element:<StartupJobs/>}
    ]
  },
  
]);

function App() {
  return <RouterProvider router={router} />
    
}


export default App
