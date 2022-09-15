import React from 'react'
import { IPuppiesData } from '../types/puppiesType'

interface IPuppyComponent extends IPuppiesData {

}

const Puppy = ({puppies}: IPuppyComponent ) => {
  return (
    <section className={'bg-[#0cc6ca] w-[100vh] flex justify-evenly items-center p-5 mb-5 '}>
    {/* <div className={'flex flex-col justify-center items-start text-[#fffaf6]'}>
      <h1>My name is {puppies.name}</h1>
      <h3>I'am a {puppies.breed}</h3>
      <h3>And my withers meassures {puppies.size}</h3>
      <h3>I'am a {puppies.breed}</h3>
      <h3>And my withers meassures {puppies.size}</h3>
    </div>
    <img src={puppies.img} alt={`A dog called ${puppies.name}`} width='200px' /> */}
    we will see
  </section>
  )
}

export default Puppy
