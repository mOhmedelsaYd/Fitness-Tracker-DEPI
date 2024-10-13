import React from 'react'
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className='bg-gray-600 flex justify-between items-center px-4 h-' >

        <ul className='flex  justify-betweenitems-center space-x-10'>
          
          <li className='text-white font-bold ' >
            <Link to="/">Logo</Link>
          </li>
          <li className='text-white font-bold'>
            <Link to="/SignUp">Register</Link>
          </li>
          
        </ul>
      </nav>
    )
}

export default NavBar
