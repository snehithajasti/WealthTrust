import React from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate=useNavigate();

  const isProfileComplete = () => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
  
    return(
      profile?.name &&
      profile?.surname &&
      profile?.gender &&
      profile?.date
    )
  }

  const handleGetStarted = () => { 
    if(!isProfileComplete()){
      navigate('/userinfo')
    }else{
      navigate('/?scroll=features')
    }
  }

  return (
    <div className='flex justify-between m-auto bg-slate-600 w-300 h-120 rounded-lg'>
        <div className='flex flex-col ml-12 mt-32 text-center'>
            <h1 className='text-4xl font-bold text-slate-200'>Effortless Finance <br/> for a Smarter Future</h1>
            <p className='text-sm mt-3 text-slate-100'>A simple and smart way to manage expenses, <br /> budgets,and savings-all in one place</p>
            <div className='mt-6'>
                <button onClick={handleGetStarted} className='bg-slate-200 text-slate-600 p-2 rounded-full font-semibold hover:bg-slate-50 '>Get Started</button>
                <img src="" alt="" />
            </div>   
        </div>
        <div className='flex justify-center mr-8'>
            <img className='h-108' src={assets.cards} alt="" />
        </div>
    </div>
  )
}

export default Header