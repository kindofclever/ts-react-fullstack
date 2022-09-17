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

  useEffect(() => {
    const getPuppyDataFromApi = async () => {
      try {
        const responseObject = await fetch('/api/puppies');
        const puppiesData = await responseObject.json();
        setPuppies(puppiesData.puppies);
      } catch (error) {
        console.log(error)
      };
    }
    getPuppyDataFromApi(); 
  }, []);

  return (
    <main className='flex flex-col justify-center items-center onClick={handleClick}'>
      <Header />
      <ListOfPuppies puppies={puppies} render={render} setRender={setRender} />
      <AddAPuppyForm puppies={puppies} setPuppies={setPuppies} render={render} setRender={setRender}/> 
    </main>
  )
}

export default Home