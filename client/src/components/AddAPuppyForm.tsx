import React, { useState } from 'react'
import { IPuppyData } from '../types/puppyType';
import { IPuppiesData } from '../types/puppiesType';

interface IAddPuppyFormComponent extends IPuppiesData {
  setPuppies: React.Dispatch<React.SetStateAction<any>>,
  addButtonClicked: boolean,
  setAddButtonClicked: React.Dispatch<React.SetStateAction<boolean>>,
  setRender: React.Dispatch<React.SetStateAction<number>>,
  render: number
};

const AddAPuppyForm: React.FC<IAddPuppyFormComponent> = ({ setPuppies, puppies, addButtonClicked, setAddButtonClicked, setRender, render}) => {
  
  const [formInput, setFormInput] = useState({
    name: '',
    breed: '',
    dob: '2000-01-01',
    size: 0,
    img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  })

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
      const rawResponse = await fetch('https://puppy-backend.onrender.com/api/puppies', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPuppy)
      });
      const content = await rawResponse.json();
      setPuppies(() => [...puppies, content.puppy]);
    })();

    setFormInput({
      name: '',
      breed: '',
      dob: '2000-01-01',     
      size: 0,
      img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
    })
     setAddButtonClicked(!addButtonClicked)
  };

  return (
    <section className='bg-[#f84a4a] flex flex-col justify-start items-center my-5 rounded-lg'>
      <h1 className='text-[#5230d2] text-xl p-3 md:p-0 md:text-4xl font-extrabold text-center my-5'>Wanna add a sweet puppy to the collection? Do it here!</h1>
      <form className='flex flex-col justify-center items-end'>
        <fieldset className='p-2 md:p-4 flex justify-center items-center w-[70vw]'>
          <label className='w-[40%] shadow-xl text-center rotate-[-5deg] bg-[#262620] text-[#f4f7f2] p-3 mr-5' htmlFor="name">What is your puppys name?</label>
          <input 
            className='mb-1 w-full h-10 p-3 bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
            type="text" 
            required 
            id='name'
            autoFocus
            value={formInput.name}
            onChange={handleChange}
            name='name' />
        </fieldset>
        <fieldset className='p-2 md:p-4 flex justify-center items-center w-[70vw]'>
          <label className='w-[40%] shadow-xl text-center rotate-[5deg] bg-[#262620] text-[#f4f7f2] p-3 mr-5' htmlFor="breed">What breed is it?</label>
          <input 
            className='mb-1 w-full h-10 p-3 bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
            type="text" 
            required 
            id='breed' 
            value={formInput.breed}
            onChange={handleChange} 
            name='breed'/>
        </fieldset>
        <fieldset className='p-2 md:p-4 flex justify-center items-center w-[70vw]'>
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
        <fieldset className='p-2 md:p-4 flex justify-center items-center w-[70vw]'>
          <label className='w-[40%] shadow-xl text-center rotate-[5deg] bg-[#262620] text-[#f4f7f2] p-3 mr-5' htmlFor="size">How many cm do its withers meassure?</label>
          <input 
            className='mb-1 w-full h-10 p-3 bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
            type="number" 
            required 
            id='size' 
            maxLength={3}
            value={formInput.size}
            onChange={handleChange}
            name='size' />
        </fieldset>
        <fieldset className='p-2 md:p-4 flex justify-center items-center w-[70vw]'>
          <label className='w-[40%] shadow-xl text-center rotate-[-5deg] bg-[#262620]  text-[#f4f7f2] p-3 mr-5' htmlFor="img">Provide the URL for an image!</label>
          <input 
            className='mb-1 w-full h-10 p-3 text-[#262620] bg-[#f4f7f2] placeholder-[#5230d2] rounded-lg' 
            type="text" 
            required 
            id='img' 
            value={formInput.img} 
            onChange={handleChange}
            name='img' />
        </fieldset>
        <button 
          className='p-2 shadow-xl w-[30%] bg-[#5230d2] rounded-lg mb-3 text-[#f4f7f2] mr-4'
          onClick={() => setAddButtonClicked(!addButtonClicked)}>
            Cancel
        </button>
        <button 
          className='p-2 shadow-xl w-[30%] bg-[#5230d2] rounded-lg mb-3 text-[#f4f7f2] mr-4'
          onClick={handleClick}>
          Submit
        </button>
      </form>
    </section>
  )
}

export default AddAPuppyForm