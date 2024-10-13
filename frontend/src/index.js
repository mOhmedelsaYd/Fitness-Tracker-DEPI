import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import SignUp from './Pages/SignUp';
import { createBrowserRouter,RouterProvider,Route,createRoutesFromElements } from "react-router-dom"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />} >

    <Route index={true} path="/" element={<Signin />} />

    <Route path="/home" element={<Home />} />
    <Route path="/SignUp" element={<SignUp />} />
    
    </Route>
))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
);


