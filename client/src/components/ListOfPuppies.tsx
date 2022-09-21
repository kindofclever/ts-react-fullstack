import React, { useEffect, useState } from 'react'
import { IPuppiesData } from '../types/puppiesType'
import { Link } from 'react-router-dom';
interface IListOfPuppiesComponent extends IPuppiesData {
};

const ListOfPuppies: React.FC<IListOfPuppiesComponent>= ({puppies}) => {

const [hoveredCart, setHoveredCart] = useState(-1);

useEffect (() => {
     
}, [])

const showButtonHandler = (i:number)=>{
     setHoveredCart(i);
}

const hideButtonHandler=()=>{
       setHoveredCart(-1)
}

return (
  <ul className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row justify-between items-center gap-3'}>
    {puppies.map((puppy, i) => {
    return (
      <li key={puppy._id}
          className={'bg-[#0cc6ca] h-[100%] flex flex-col justify-evenly items-center p-5 px-10 pb-[25%] rounded-lg overflow-hidden'} 
          onMouseLeave={hideButtonHandler}
          onMouseEnter={()=>showButtonHandler(i)}>
        <div className='flex flex-col justify-evenly items-center h-[100%]'>
          <div className={'flex flex-col justify-center items-start '}>
          </div>
          <div 
            className={'flex flex-col justify-center items-center'} >
              <div className='overflow-hidden w-40 h-40'>
            <img 
              className='shadow-xl w-full h-full object-cover' 
              src={puppy.img} alt={`A dog called ${puppy.name}`} 
              />
              </div>
            <div className='flex flex-col justify-center items-center rotate-[-5deg] m-[-4%] w-[200px] h-[50px] mb-5 mt-10'>
              <h1 className={'text-3xl shadow-xl text-[#f84a4a] bg-[#262620] px-5'}>{puppy.name}</h1>
              <h3 className='text-[#262620] text-3xl'>I'm a <span className={'text-[#5230d2] my-3'}>{puppy.breed}</span></h3>
              <Link 
              to={`/${puppy._id}`}
              className={`${hoveredCart === i? 'block':'hidden'} bg-[#262620] flex justify-center items-center shadow-xl p-5 rounded-lg  mt-5 text-[#f4f7f2]`}>
              <button>
                Get more Info about {puppy.name}
              </button>
            </Link>
            </div>
           
          </div>
        </div>
      </li>
    )}
    )}
  </ul>
)
}


export default ListOfPuppies