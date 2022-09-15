import { useState, useEffect } from 'react';
import { IPuppiesData } from './types/puppiesType';
import Header from './components/Header';
import ListOfPuppies from './components/ListOfPuppies';


const App = () => {
  const [puppies, setPuppies] = useState<IPuppiesData['puppies']>([]);

  useEffect(() => {
    const getPuppyDataFromApi = async () => {
      try {
        const responseObject = await fetch('/api/puppies');
        const puppiesData = await responseObject.json();
        setPuppies(puppiesData.puppies);
        console.log(puppies)        
      } catch (error) {
        console.log(error)
      };
    }
    getPuppyDataFromApi(); 
  }, []);

  return (
    <main>
      <Header />
      <ListOfPuppies puppies={puppies}/>
    </main>
  )
}

export default App;

