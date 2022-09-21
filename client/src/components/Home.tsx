import React, { useEffect, useState } from 'react'
import { IPuppiesData } from '../types/puppiesType'
import AddAPuppyForm from './AddAPuppyForm'
import Header from './Header'
import ListOfPuppies from './ListOfPuppies'

interface IHomeComponent extends IPuppiesData {
  render: number,
  setRender: React.Dispatch<React.SetStateAction<number>>
};

const Home: React.FC<IHomeComponent> = (props : IPuppiesData, {setRender, render}) => {
  const [puppies, setPuppies] = useState<IPuppiesData['puppies']>([]);
  const [addButtonClicked, setAddButtonClicked] = useState(false);

  useEffect(() => {
    const getPuppyDataFromApi = async () => {
      try {
        const responseObject = await fetch('https://puppy-backend.onrender.com/api/puppies');
        const puppiesData = await responseObject.json();
        setPuppies(puppiesData.puppies);
      } catch (error) {
        console.log(error)
      };
    }
    getPuppyDataFromApi(); 
  }, []);

  const toggleState = (): void => {
    setAddButtonClicked(!addButtonClicked)
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <Header />
      <button 
        onClick={toggleState}
        className='bg-[#f84a4a] text-[#f4f7f2] text-3xl py-2 px-5 rounded-xl'>
          Add a puppy!
      </button>
      <main className='grid grid-col-1 justify-center items-center onClick={handleClick} m-5'>
        <ListOfPuppies puppies={puppies} />
        <div >
          {addButtonClicked 
            ?<AddAPuppyForm 
              puppies={puppies} 
              setPuppies={setPuppies} 
              addButtonClicked={addButtonClicked} 
              setAddButtonClicked={setAddButtonClicked}/>
            : ''}
        </div>
      </main>
    </div>
  )
}

export default Home