
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import Puppy from './components/Puppy';
import Home from './components/Home';
import { IPuppiesData } from './types/puppiesType';
import { useEffect, useState } from 'react';
import NotFound from './components/NotFound';

const App = () => {

  const [puppies, setPuppies] = useState<IPuppiesData['puppies']>([]);
  const [render, setRender] = useState<number>(0);

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
  }, [render]);


  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Home puppies={puppies} render={render} setRender={setRender} />}/>
        <Route path='/notfound' element={<NotFound />}/>
        <Route path='/:slug'>
          <Route path='/:slug' element={<Puppy puppies={puppies} setPuppies={setPuppies} render={render} setRender={setRender}/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;

