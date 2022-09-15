import React from 'react'
import { SiDatadog } from 'react-icons/si';

const Header = () => {
  return (
    <header className={'w-[80v] flex flex-col justify-center items-center bg-[#f4f7f2] m-5'}>
     <h2 className={'text-3xl text-[#f84a4a] italic bold tracking-wider pt-1'}>! Look at our sweet puppy pictures</h2>
      <div className={'flex justify-between items-center p-2 border-[#5230d2] border-y-2'}>
        <SiDatadog className={' text-[#f84a4a] mr-5'} size={50} />
        <h1 className={'text-7xl text-[#5230d2] uppercase tracking-widest font-bold'} >Happy-Puppy</h1>
        <SiDatadog className={' text-[#0cc6ca] ml-5'}  size={50} />
      </div>
      <h2 className={'text-3xl text-[#0cc6ca] italic bold tracking-wider pb-1'}>or add a sweet puppy you know !</h2>
    </header>
  )
}

export default Header