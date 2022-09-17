import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { IPuppiesData } from '../types/puppiesType';
import moment from 'moment';
import { IPuppyData } from '../types/puppyType';

interface IPuppyComponent extends IPuppiesData {
  render: number,
  setRender: React.Dispatch<React.SetStateAction<number>>,
};

const Puppy: React.FC<IPuppyComponent> = ({puppies, render, setRender}) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [puppyID, setPuppyID] = useState('');
  const [formInput, setFormInput] = useState({
    name: '',
    breed: '',
    dob: '0000-00-00',
    size: 0,
    img: ''
  })
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

const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
  setFormInput({
    ...formInput,
    [e.target.name]: e.target.value
  })
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();

  if ( 
    !formInput.name ||
    !formInput.breed ||
    !formInput.dob ||
    !formInput.size ||
    !formInput.img 
    ) return;
  
  const newPuppy: IPuppyData = {
    name: formInput.name,
    breed: formInput.breed,
    dob: new Date(formInput.dob),
    size: formInput.size,
    img: formInput.img
  };

  (async () => {
    const rawResponse = await fetch('/api/puppies', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPuppy)
    });
    const content = await rawResponse.json();
  })();

  setFormInput({
    name: '',
    breed: '',
    dob: '0000-00-00',
    size: 0,
    img: ''
  })
  window.location.reload();
};

  return (
    <div>
      {puppies.map(puppy => {
        if (puppy._id === puppyID) {
          return (
            <div className='text-white flex flex-col justify-center items-center'>
              <h1>{puppy.name}</h1>
              <h1>{puppy.breed}</h1>
              <h1>{moment(puppy.dob).format('MMMM Do YYYY')}</h1>
              <h1>{puppy.size}</h1>
              <h1>{puppy.img}</h1>
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
                 <section className='bg-[#f84a4a] flex flex-col justify-start items-center w-[80vw] mb-3 rounded-lg'>
                 <h1 className='text-[#5230d2] text-4xl font-extrabold my-5'>Wanna add a sweet puppy to the collection? Do it here!</h1>
                 <form className='flex flex-col justify-center items-end'>
                   <fieldset className='p-4 flex justify-center items-center w-[70vw]'>
                     <label className='w-[40%] shadow-xl text-center rotate-[-5deg] bg-[#262620] text-[#f4f7f2] p-2 mr-5' htmlFor="name">What is your puppys name?</label>
                     <input 
                       className='my-5 w-full h-10 p-3 bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
                       type="text" 
                       required 
                       id='name'
                       autoFocus
                       value={formInput.name}
                       onChange={handleChange}
                       name='name' />
                   </fieldset>
                   <fieldset className='p-4 flex justify-center items-center w-[70vw]'>
                     <label className='w-[40%] shadow-xl text-center rotate-[5deg] bg-[#262620] text-[#f4f7f2] p-2 mr-5' htmlFor="breed">What breed is it?</label>
                     <input 
                       className='my-5 w-full h-10 p-3 bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
                       type="text" 
                       required 
                       id='breed' 
                       value={formInput.breed}
                       onChange={handleChange} 
                       name='breed'/>
                   </fieldset>
                   <fieldset className='p-4 flex justify-center items-center w-[70vw]'>
                     <label className='w-[40%] shadow-xl text-center rotate-[-5deg] bg-[#262620]   text-[#f4f7f2]  p-2 mr-5' htmlFor="dob">When is its birthday?</label>
                     <input 
                       className='my-5 w-full h-10 p-3 bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
                       type="date" 
                       required 
                       id='dob'
                       value={formInput.dob}
                       onChange={handleChange} 
                       name='dob'/>
                   </fieldset>
                   <fieldset className='p-4 flex justify-center items-center w-[70vw]'>
                     <label className='w-[40%] shadow-xl text-center rotate-[5deg] bg-[#262620] text-[#f4f7f2] p-2 mr-5' htmlFor="size">How many cm do its withers meassure?</label>
                     <input 
                       className='my-5 w-full h-10 p-3 bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
                       type="number" 
                       required 
                       id='size' 
                       maxLength={3}
                       value={formInput.size}
                       onChange={handleChange}
                       name='size' />
                   </fieldset>
                   <fieldset className='p-4 flex justify-center items-center w-[70vw]'>
                     <label className='w-[40%] shadow-xl text-center rotate-[-5deg] bg-[#262620]  text-[#f4f7f2] p-2 mr-5' htmlFor="img">Provide the URL for an image!</label>
                     <input 
                       className='my-5 w-full h-10 p-3 text-[#262620] bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
                       type="text" 
                       required 
                       id='img' 
                       value={formInput.img} 
                       onChange={handleChange}
                       name='img' />
                   </fieldset>
                       <button 
                         className='p-2 shadow-xl w-[30%] bg-[#5230d2] rounded-lg mb-3 text-[#f4f7f2] mr-4'
                         onClick={handleClick}>
                         Submit
                       </button>
                 </form>
               </section>
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

