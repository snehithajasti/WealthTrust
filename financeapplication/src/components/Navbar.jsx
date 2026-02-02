import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [newuser,setNewUser] = useState(0);

  const isProfileComplete = () => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
  
    return(
      profile?.name &&
      profile?.surname &&
      profile?.gender &&
      profile?.date
    )
  }

  const handleFeaturesClick = () => {
    if(!isProfileComplete()){
      navigate('/userinfo');
      alert('Complete your profile before getting started')
    }else{
      navigate('/?scroll=features')
    }
  }
  const handleGetStarted = () => { 
    if(!isProfileComplete()){
      navigate('/userinfo')
    }else{
      navigate('/?scroll=features')
    }
  }
  return (
    <div className='flex h-16 m-4 mt-4 mb-14 p-4 bg-slate-600 justify-between items-center rounded-3xl '>
        <div className='flex gap-2'>
          <img className='w-8 cursor-pointer' onClick={()=>navigate('/')} src={assets.applogo} alt="" />
          <p className='bg-slate-300 text-md text-slate-600 font-semibold p-2 rounded-xl'>WealthTrust</p>
        </div>
        
        <div className='bg-slate-400 p-3 pl-4 pr-4 text-slate-50 rounded-2xl'>
            <ul className='flex gap-4'>
              <li onClick={()=>navigate('/')}>HOME</li>
              <li onClick={handleFeaturesClick}>FEATURES</li>
              <li onClick={()=>navigate('/Analytics')}>ANALYTICS</li>
              <li onClick={()=>navigate('/About')}>ABOUT</li>
            </ul>
        </div>
        <div>
          {isProfileComplete() ?
             <button onClick={()=>navigate('/userinfo')} className='bg-slate-300 text-md p-2 rounded-xl hover:bg-slate-200'>View Profile</button>
             : 
             <button onClick={handleGetStarted} className='bg-slate-300 text-md p-2 rounded-xl hover:bg-slate-200'>Get Started</button>
          }
          
        </div>
    </div>
  )
}

export default Navbar