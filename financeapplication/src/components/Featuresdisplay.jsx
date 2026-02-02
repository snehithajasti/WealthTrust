import React from 'react'
import { useNavigate } from 'react-router-dom'

const Featuresdisplay = () => {
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
    
    return (
        <div className='flex flex-col m-12 '>
            <h1 className='text-3xl text-slate-800 font-semibold hover:text-slate-900 mb-12'>Why WealthTrust Is Your Smartest Financial Companion?</h1>
            <div className='flex flex-col bg-slate-900 p-6 rounded-xl'>
                <div className='flex justify-between mb-12'>
                    <h1 className='text-2xl font-bold text-slate-50'>Smart Tools To Transform Your <br /> Financial Routine</h1>
                    <p className='text-md text-slate-50'>
                        Take control of your finances with a simple, <br />
                        intuitive platform built to track spending, <br />
                        set goals,and understand your money better
                    </p>
                </div>
                <div className='flex gap-4 mb-12 '>
                    <div className='flex flex-col justify-center bg-slate-50 h-70 w-90 rounded-xl hover:-translate-y-3 transition duration-300 ease-in-out'>
                        <h3 className='text-xl font-semibold text-center text-slate-950 mt-12'>Expense Tracking</h3>
                        <p className='text-sm text-center text-slate-950 mt-3 mb-6'>Track and categorize your daily spending with ease to stay aware and in control</p>
                        <button onClick={()=>isProfileComplete() ? navigate('/expensetracking') : navigate('/userinfo')} className='bg-slate-950 text-slate-50 rounded-xl p-2 w-25 ml-auto mr-auto'>Try Now</button>
                    </div>
                    <div className='flex flex-col justify-center bg-slate-50 h-70 w-90 rounded-xl hover:-translate-y-3 transition duration-300 ease-in-out'>
                        <h3 className='text-xl font-semibold text-center text-slate-950 mt-12'>Goals&Budgets</h3>
                        <p className='text-sm text-center text-slate-950 mt-3 mb-6'>Set achievable goals and budgets that help you plan smarter and save consistently</p>
                        <button onClick={()=>isProfileComplete() ? navigate('/goalsandbudgets') : navigate('/userinfo')} className='bg-slate-950 text-slate-50 rounded-xl p-2 w-25 ml-auto mr-auto'>Try Now</button>
                    </div>
                    <div className='flex flex-col justify-center bg-slate-50 h-70 w-90 rounded-xl hover:-translate-y-3 transition duration-300 ease-in-out'>
                        <h3 className='text-xl font-semibold text-center text-slate-950 mt-12'>Account Balance Overview</h3>
                        <p className='text-sm text-center text-slate-950 mt-3 mb-6'>View all your account balances in one secure place for quick,real-time clarity</p>
                        <button onClick={()=>isProfileComplete() ? navigate('/investments') : navigate('/userinfo')} className='bg-slate-950 text-slate-50 rounded-xl p-2 w-25 ml-auto mr-auto'>Try Now</button>
                    </div>
                    <div className='flex flex-col justify-center bg-slate-50 h-70 w-90 rounded-xl hover:-translate-y-3 transition duration-300 ease-in-out'>
                        <h3 className='text-xl font-semibold text-center text-slate-950 mt-12'>Financial Analytics</h3>
                        <p className='text-sm text-center text-slate-950 mt-3 mb-6'>View clear insights and visuals of your spending patterns and progress</p>
                        <button onClick={()=>isProfileComplete() ? navigate('/analytics') : navigate('/userinfo')} className='bg-slate-950 text-slate-50 rounded-xl p-2 w-25 ml-auto mr-auto'>Try Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featuresdisplay