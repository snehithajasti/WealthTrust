import React from 'react'
import { useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets.js';


const Livetrackingandbenefits = () => {
  const navigate = useNavigate();

  const isProfileComplete = () => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
  
    return(
      profile?.name &&
      profile?.surname &&
      profile?.gender &&
      profile?.date
    )
  }

  const handleExplore = () => { 
    if(!isProfileComplete()){
      navigate('/userinfo')
    }else{
      navigate('/?scroll=features')
    }
  }

  return (
    <div className='flex m-20 mt-20 mb-12 h-100 justify-between'>
      <div className='flex flex-col gap-2 justify-center'>
        <h1 className='text-3xl font-semibold mb-6'>Smarter Money, Clearer Goals</h1>
        <p className='text-sm font-medium text-slate-950'>Stay on track with personalized goals and flexible monthly budgets.</p>
        <p className='text-sm font-medium text-slate-950'>Get a clear overview of all your accounts in one secure place.</p>
        <p className='text-sm font-medium text-slate-950'>Understand your spending instantly with a visual, interactive dashboard.</p>
        <button onClick={handleExplore} className='bg-slate-950 text-md font-semibold text-slate-50 mt-5 p-2 w-20 hover:-translate-y-2 transition duration-300 ease-in-out rounded-full'>Explore</button>
      </div>
      <div className='flex gap-4'>
        <div className='flex'>
          <div className='bg-slate-100 h-93 w-60 rounded-xl hover:translate-x-2 transition duration-300 ease-in-out'>
            <img className='h-93 w-60 rounded-xl' src={assets.picture1} alt="" />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='bg-slate-800 h-30 w-60 mb-1 rounded-xl hover:translate-y-2 transition duration-300 ease-in-out'>
            <img className='h-30 w-60 rounded-xl' src={assets.picture2} alt="" />
          </div>
          <div className='bg-slate-800 h-60 w-60 rounded-xl hover:-translate-y-2 transition duration-300 ease-in-out'>
            <img className='h-60 w-60 rounded-xl' src={assets.picture3} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Livetrackingandbenefits