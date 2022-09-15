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
            <h1>My name is {puppy.name}</h1>
            <h3>I'am a {puppy.breed}</h3>
            <h3>And my withers meassures {puppy.size}</h3>
            <h3>I'am a {puppy.breed}</h3>
            <h3>And my withers meassures {puppy.size}</h3>
            <img src={puppy.img} alt={`A dog called ${puppy.name}`} width='200px' />
          </section>
        )
      })}
    </ul>
  )
}

export default ListOfPuppies