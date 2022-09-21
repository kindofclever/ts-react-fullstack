import React, { useState } from 'react'
import moment from 'moment';
import { IPuppiesData } from '../types/puppiesType';
import { IPuppyData } from '../types/puppyType';
import { useNavigate } from 'react-router-dom'

interface IEditAPuppyFormComponent extends IPuppiesData {
  puppyID: string,
  editButtonClicked: boolean,
  setEditButtonClicked: React.Dispatch<React.SetStateAction<boolean>>,
}

const EditAPuppyForm: React.FC<IEditAPuppyFormComponent> = ({puppies, puppyID, setEditButtonClicked, editButtonClicked }) => {



  const [formInput, setFormInput] = useState({
    name: 'New name',
    breed: 'New breed',
    dob: 'YYYY-MM-DD',
    size: 0,
    img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  })

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  
    if ( 
      !formInput.name ||
      !formInput.breed ||
      !formInput.dob ||
      !formInput.size ||
      !formInput.img 
      ) return;
    
    const editedPuppy: IPuppyData = {
      name: formInput.name,
      breed: formInput.breed,
      dob: new Date(formInput.dob),
      size: formInput.size,
      img: formInput.img
    };
  
    (async () => {
      const rawResponse = await fetch(`https://puppy-backend.onrender.com/api/puppies/${puppyID}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedPuppy)
      });
      const content = await rawResponse.json();
    })();
  
    setFormInput({
    name: '',
    breed: '',
    dob: '0000-00-00',
    size: 0,
    img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
    })
    window.location.reload();
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value
    })
  };

  return (
    <div>
      {puppies.map(puppy => {
        if(puppy._id === puppyID){
          return ( 
            <section className='bg-[#0cc6ca] flex flex-col justify-start items-center w-[80vw] mb-3 text-black rounded-lg'>
              <h1 className='text-[#5230d2] text-4xl font-extrabold my-5'>Update my infos here</h1>
              <form className='flex flex-col justify-center items-end'>
                <fieldset className='p-4 flex justify-center items-center w-[70vw]'>
                  <label className='w-[40%] shadow-xl text-center rotate-[-5deg] bg-[#262620] text-[#f4f7f2] p-3 mr-5' htmlFor="name">What is your puppys name?</label>
                  <input 
                    className='my-1 w-full h-10 p-3 bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
                    type="text" 
                    required 
                    id='name'
                    autoFocus
                    value={formInput.name}
                    onChange={handleChange}
                    name='name' />
                </fieldset>
                <fieldset className='p-4 flex justify-center items-center w-[70vw]'>
                  <label className='w-[40%] shadow-xl text-center rotate-[5deg] bg-[#262620] text-[#f4f7f2] p-3 mr-5' htmlFor="breed">What breed is it?</label>
                  <input 
                    className='my-1 w-full h-10 p-3 bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
                    type="text" 
                    required 
                    id='breed' 
                    value={formInput.breed}
                    onChange={handleChange} 
                    name='breed'/>
                </fieldset>
                <fieldset className='p-4 flex justify-center items-center w-[70vw]'>
                  <label className='w-[40%] shadow-xl text-center rotate-[-5deg] bg-[#262620]   text-[#f4f7f2]  p-3 mr-5' htmlFor="dob">When is its birthday?</label>
                  <input 
                    className='my-1 w-full h-10 p-3 bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
                    type="date" 
                    required 
                    id='dob'
                    value={formInput.dob}
                    onChange={handleChange} 
                    name='dob'/>
                </fieldset>
                <fieldset className='p-4 flex justify-center items-center w-[70vw]'>
                  <label className='w-[40%] shadow-xl text-center rotate-[5deg] bg-[#262620] text-[#f4f7f2] p-3 mr-5' htmlFor="size">How many cm do its withers meassure?</label>
                  <input 
                    className='my-1 w-full h-10 p-3 bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
                    type="number" 
                    required 
                    id='size' 
                    maxLength={3}
                    value={formInput.size}
                    onChange={handleChange}
                    name='size' />
                </fieldset>
                <fieldset className='p-4 flex justify-center items-center w-[70vw]'>
                  <label className='w-[40%] shadow-xl text-center rotate-[-5deg] bg-[#262620]  text-[#f4f7f2] p-3 mr-5' htmlFor="img">Provide the URL for an image!</label>
                  <input 
                    className='my-1 w-full h-10 p-3 text-[#262620] bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
                    type="text" 
                    required 
                    id='img' 
                    value={formInput.img} 
                    onChange={handleChange}
                    name='img' />
                </fieldset>
                    <button 
                      className='p-2 shadow-xl w-[30%] bg-[#5230d2] rounded-lg mb-3 text-[#f4f7f2] mr-4'
                      onClick={() => setEditButtonClicked(!editButtonClicked)}>
                      Cancel
                    </button>
                    <button 
                      className='p-2 shadow-xl w-[30%] bg-[#5230d2] rounded-lg mb-3 text-[#f4f7f2] mr-4'
                      onClick={handleClick}>
                      Edit
                    </button>
                    
            </form>
          </section>
          )
        } else {
          return(
            ''
          )
        }
        }
      )}
    </div>
  )
}
export default EditAPuppyForm