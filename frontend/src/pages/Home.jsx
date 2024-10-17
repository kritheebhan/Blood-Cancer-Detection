import React from 'react'
import { Link } from 'react-router-dom';
// import bg from "../components/img/bg.jpg"

function Home() {
  return (

    <div className='background grid grid-cols-2'>
        <div>

        </div>

        <div className='col-span-2'>
          <div className='flex justify-end items-center text-blue-950 text-center pr-36 mt-32'>
            <h1 className='font-bold text-4xl '>Caring for your health today <br /> ensures a better tomorrow</h1>
          </div>
          <div className='flex justify-end pr-72 mt-6'>
            <button className='bg-blue-950 text-white font-bold px-6 py-2' >
              <Link to='/Login'>MAKE APPOINMENT</Link>
            </button>
          </div>
          
        </div>
        
        <Link to='/model'>Model</Link>
    </div>
    
  )
}

export default Home