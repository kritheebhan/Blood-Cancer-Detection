import React from 'react';
import { Link } from 'react-router-dom';
import logo from './img/logo.png'


function Navbar() {
  return (
    <div>
      <nav className='flex flex-col'>
        <div className='flex py-4 mx-20 '>
        <div className=''>
          <img src={logo} alt="" className='h-8' />
        </div>
       <div className='ml-auto'>
       <button className='bg-blue-950 text-white font-bold px-6 py-2 mr-3' >
            <Link to='/Login'>Sign In</Link>
        </button>
        <button className='bg-blue-950 text-white font-bold px-6 py-2' >
            <Link to='/Login'>Log In</Link>
        </button>
        </div>
       </div>
        <div className='py-2 bg-blue-950 w-full  '>
          <div className='mx-20'>
          <Link to="/" className='pr-8 text-white'>Home</Link>
          <Link to="/about" className='px-8 text-white'>About</Link>
          <Link to="/contact" className='px-8 text-white'>Contact</Link>
          </div>
        </div>
       
      </nav>
    </div>
  );
}

export default Navbar;
