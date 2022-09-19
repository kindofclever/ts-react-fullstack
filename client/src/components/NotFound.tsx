import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
    <div>NotFound</div>
    <Link to='/'>
      <button className='text-black bg-white'>
        Go back
      </button>
    </Link>
    </div>
  )
}

export default NotFound