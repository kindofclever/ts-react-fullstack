import React, { useEffect, useState } from 'react'
import { IPuppiesData } from '../types/puppiesType'
import moment from 'moment';
import { Link } from 'react-router-dom';

interface IListOfPuppiesComponent extends IPuppiesData {
  render: number,
  setRender: React.Dispatch<React.SetStateAction<number>>
};

const ListOfPuppies: React.FC<IListOfPuppiesComponent>= ({puppies, render, setRender}) => {

const [hoveredCart, setHoveredCart] = useState(-1);

useEffect (() => {
     
}, [])

const showButtonHandler = (i:number)=>{
     setHoveredCart(i);
}

const hideButtonHandler=()=>{
       setHoveredCart(-1)
}

const clickHandler = (): void => {
}

return (
  <ul className={'flex flex-col justify-between items-center'}>
    {puppies.map((puppy, i) => {
    return (
      <li key={puppy._id}
          className={'bg-[#0cc6ca] w-[80vw] flex flex-col justify-evenly items-center p-5 mb-5 rounded-lg'} 
          onMouseLeave={hideButtonHandler}
          onMouseEnter={()=>showButtonHandler(i)}>
        <div className='flex w-[80vw] justify-evenly items-center mb-5'>
          <div className={'flex flex-col justify-center items-start text-[#262620]'}>
            <h3>I'am a <span className={'text-[#5230d2] mb-3'}>{puppy.breed}</span></h3>
            <h3>And my withers meassures <span className={'text-[#5230d2]'}>{puppy.size}</span> cm</h3>
            <h3>My birthday is <span className={'text-[#5230d2]'}>{moment(puppy.dob).format('MMMM Do YYYY')}</span></h3>
          </div>
          <div className={'flex flex-col justify-center items-center '}>
            <img className='shadow-xl' src={puppy.img} alt={`A dog called ${puppy.name}`} width='300px' />
            <div className='flex justify-center items-center rotate-[-5deg] m-[-4%] w-[200px] h-[50px] '>
              <h1 className={'text-3xl shadow-xl text-[#f84a4a] bg-[#262620] px-5'}>{puppy.name}</h1>
            </div>
          </div>
        </div>
        <div className='flex w-[80vw] justify-start items-center mt-[5%] ml-[15%]'>
        <Link 
          to={`/${puppy._id}`}
          className={`${hoveredCart === i? 'block':'hidden'} bg-[#262620] shadow-xl rounded-lg w-[40%] h-[10vh] text-[#f4f7f2] mt-[-7%]`}>
          <button 
            onClick={clickHandler} >
            Get more Info about {puppy.name}
          </button>
        </Link> 
        </div>
      </li>
    )}
    )}
  </ul>
)
}


export default ListOfPuppies