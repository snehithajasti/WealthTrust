import React from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'

const Calltoaction = () => {
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

  const handleStartYourJourney = () => { 
    if(!isProfileComplete()){
      navigate('/userinfo')
    }else{
      navigate('/?scroll=features')
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col justify-center items-center bg-slate-900 w-240 h-80 m-12 rounded-xl'>
        <h1 className='text-slate-50 text-extrabold text-4xl text-center mb-6'>Get started with <br /> WealthTrust today!</h1>
        <div className='flex gap-4'>
          <div className='flex gap-2 bg-slate-50 rounded-full px-3 py-2'>
            <img className='w-6' src={assets.tickmark} alt="" />
            <p className='text-slate-900 text-sm font-medium'>Quick Setup</p>
          </div>
          <div className='flex gap-2 bg-slate-50 rounded-full px-3 py-2'>
            <img className='w-6' src={assets.tickmark} alt="" />
            <p className='text-slate-900 text-sm font-medium'>Clear Reports</p>
          </div>
          <div className='flex gap-2 bg-slate-50 rounded-full px-3 py-2'>
            <img className='w-6' src={assets.tickmark} alt="" />
            <p className='text-slate-900 text-sm font-medium'>Track Growth</p>
          </div> 
        </div>
        <div className='h-1 w-120 bg-slate-50 mt-4 rounded-full opacity:50'></div>
        <button onClick={handleStartYourJourney} className='bg-slate-50 text-slate-900 text-sm font-semibold mt-4 rounded-xl px-3 py-2'>Start Your Journey</button>
    </div>
    </div>
  )
}

export default Calltoaction