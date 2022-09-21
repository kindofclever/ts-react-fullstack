import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='text-6xl my-[15%] text-[#f4f7f2] h-full'>
        The page you were looking for was not found...
      </div>
      <Link to='/'>
        <button className='text-[#262620] bg-[#0cc6ca] p-3 rounded-xl'>
          Go back to the home page
        </button>
      </Link>
    </div>
  )
}

export default NotFound