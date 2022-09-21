import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IPuppiesData } from '../types/puppiesType';
import moment from 'moment';
import EditAPuppyForm from './EditAPuppyForm';

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
        navigate('/notfound');
      } 
      setPuppyID(slug);
    } else { 
      setPuppyID('not found');
    }
  }, []);

  const deletePuppy = async () => {
    const rawResponse = await fetch(`/api/puppies/${puppyID}`,
     {
      method: 'Delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const content = await rawResponse.json();
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
              <div className='bg-[#f84a4a] text-3xl flex justify-center items-center rotate-2 px-6 py-2 '>
               <h1>{puppy.name}</h1>
              </div>
              <h1>{puppy.breed}</h1>
              <h1>{moment(puppy.dob).format('MMMM Do YYYY')}</h1>
              <h1>{puppy.size}</h1>
              <Link to='/'> 
                <button 
                  className='bg-white text-black'
                  onClick={handleDelete}>
                    Delete me
                </button>
              </Link>
              <Link to='/'> 
                <button className='bg-white text-black'>
                    Go Back
                </button>
              </Link>
              <button 
                className='bg-white text-black'
                onClick={toggleState}>
                  Edit me
              </button>
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

