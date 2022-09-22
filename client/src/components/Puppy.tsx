import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IPuppiesData } from '../types/puppiesType';
import moment from 'moment';
import EditAPuppyForm from './EditAPuppyForm';
import axios from 'axios';

interface IPuppyComponent extends IPuppiesData {
  render: number,
  setRender: React.Dispatch<React.SetStateAction<number>>,
};

const Puppy: React.FC<IPuppyComponent> = ({puppies, render, setRender}) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [puppyID, setPuppyID] = useState('');
  const [editButtonClicked, setEditButtonClicked] = useState(false);

  useEffect (() => {
    if (slug) {
      if (slug.length !== 24) {
        console.log(`wrong = ${slug}`)
        navigate('/notfound');
      } else {
        console.log(`correct = ${slug}`);
        setPuppyID(slug);
      }
    } else { 
      console.log(`verybad = ${slug}`)
      setPuppyID('0');
    } 
  }, []);

  const deletePuppy = async () => {
    try {
      const res = await axios.delete(`https://puppy-backend.onrender.com/api/puppies${puppyID}`)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    }
  
  const handleDelete = (): void => {
      deletePuppy();
  };

  const toggleState = (): void => {
    setEditButtonClicked(!editButtonClicked)
};


  return (
    <div>
      {puppies.map(puppy => {
        if (puppy._id === puppyID) {
          return (
            <div className='text-[#f4f7f2] flex flex-col justify-center items-center'>

              <img 
                src={puppy.img} 
                alt={`A dog called ${puppy.name}`}
                width='300px'
                className='rounded-full mt-5' />
              <div className='bg-[#f84a4a] text-3xl md:text-5xl flex justify-center items-center rotate-2 px-6 py-2 '>
               <h1>{puppy.name}</h1>
              </div>
              <div className='bg-[#f4f7f2] p-3 mt-5 rounded-xl'>
                <h1 className='mb-5 text-[#262620] text-2xl md:text-3xl'>I am a {puppy.breed}.</h1>
                <h1 className='mb-5 text-[#262620] text-2xl md:text-3xl'>My birthday is {moment(puppy.dob).format('MMMM Do YYYY')}.</h1>
                <h1 className='mb-5 text-[#262620] text-2xl md:text-3xl'>And my withers are {puppy.size}cm high.</h1>
              </div>
              <div className='flex justify-evenly items-center'>
                <Link to='/'> 
                  <button 
                    className='bg-[#f84a4a] text-[#f4f7f2] py-2 px-5 rounded-xl m-5' 
                    onClick={handleDelete}>
                      Delete
                  </button>
                </Link>
                <Link to='/'> 
                  <button className='bg-[#5230d2] text-[#f4f7f2] py-2 px-5 rounded-xl m-5'>
                      Go Back
                  </button>
                </Link>
                <button 
                  className='bg-[#0cc6ca] text-[#f4f7f2] py-2 px-5 rounded-xl m-5'
                  onClick={toggleState}>
                    Edit me
                </button>
              </div>
              <div>
                  {editButtonClicked? 
                  <EditAPuppyForm puppies={puppies} editButtonClicked={editButtonClicked} setEditButtonClicked={setEditButtonClicked} puppyID={puppyID}/>
                  : ''}
                </div>
            </div>
          )
        } else return''
      })}
    </div>
  )
}

export default Puppy

