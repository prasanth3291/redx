import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
function Navb() {
  return (
    <div className='navb'>
    <Link to='/' style={{textDecoration:'none'}}>       
         <div className='home'>Home</div>
    </Link>

        <div className='search'>
            <input type="text" placeholder='Search' />
        </div>
      
    </div>
  )
}

export default Navb
