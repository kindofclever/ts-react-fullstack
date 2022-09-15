import React from 'react'
import { IPuppiesData } from '../types/puppiesType'

interface IListOfPuppiesComponent extends IPuppiesData {

}

const ListOfPuppies: React.FC<IListOfPuppiesComponent>= ({puppies}) => {
  return (
    <ul className={'flex flex-col justify-between items-center'}>
      {puppies.map( puppy => {
        return (
          <section className={'bg-[#0cc6ca] w-[100vh] flex justify-evenly items-center p-5 mb-5 '}>
            <div className={'flex flex-col justify-center items-start text-[#262620]'}>
              <h3>I'am a <span className={'text-[#5230d2] mb-3'}>{puppy.breed}</span></h3>
              <h3>And my withers meassures <span className={'text-[#5230d2]'}>{puppy.size}</span></h3>
            </div>
            <div className={'flex flex-col justify-center items-center'}>
              <img src={puppy.img} alt={`A dog called ${puppy.name}`} width='200px' />
              <div className='flex justify-center items-center rotate-[-5deg] m-[-4%] w-[200px] h-[50px] '>
                <h1 className={' text-3xl text-[#f84a4a] bg-[#262620] mb-4 px-5'}>{puppy.name}</h1>
              </div>
            </div>
          </section>
        )
      })}
    </ul>
  )
}

export default ListOfPuppies