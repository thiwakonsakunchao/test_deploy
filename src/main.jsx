import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserDashboard from './pages/UserDashboard.jsx';
import NumberParkingPage from './pages/NumberParkingPage.jsx';
import NumberCarsPage from './pages/NumberCarsPage.jsx';

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListLicensePlate from './pages/ListLicensePlate.jsx';
import EntranceExitPage from './pages/EntranceExitPage.jsx';
import LoginPage from './pages/LoginPage.jsx';



const router = createBrowserRouter([
  {
    path: "/1",
    element: <App />,
  },{
    path: "/",
    element: <UserDashboard />
  },{
    path: "/login",
    element: <LoginPage />
  },{
    path: "/admin",
    element: <NumberCarsPage/>
  },{
    path: "/admin2",
    element: <NumberParkingPage/>
  },{
    path: "/admin3",
    element: <ListLicensePlate/>
  },{
    path: "/admin4",
    element: <EntranceExitPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
