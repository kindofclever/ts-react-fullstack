import React from 'react'
import { Link } from 'react-router-dom'

const Edited = () => {
  return (
    <div>
      <div>Edited</div>
      <Link to='/'>
        <button className='text-black bg-white'>Go back</button>
      </Link>
    </div>
  )
}

export default Edited