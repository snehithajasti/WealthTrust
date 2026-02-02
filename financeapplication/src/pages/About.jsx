import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center h-156 w-196 bg-slate-900 p-6 gap-8 rounded-lg mx-auto'>
      <h1 className='flex items-center justify-center w-full bg-slate-400 rounded-lg h-12 text-xl font-semibold '>About Us</h1>
      <div className='flex flex-col items-center justify-center bg-slate-400 rounded-lg p-6 gap-6'>
        <div className='flex items-center justify-center'>
          <p className='text-center text-md font-semibold'>This Finance Application is a personal finance management platform designed to help users track income, expenses, budgets, and financial goals efficiently.</p>
        </div>
        <div className='border border-slate-900 border-2 rounded-lg h-96 w-156 px-8 py-8'>
          <div className='flex flex-col gap-4 items-start justify-center'>
            <div className='flex items-center justify-center bg-slate-900 h-12 rounded-lg w-64'>
              <h3 className='text-lg text-slate-50 font-semibold'>Problems It Solves</h3>
            </div>
            <div>
              <ul>
                <li className='text-slate-900 text-md font-medium'>1.Difficulty in tracking expenses</li>
                <li className='text-slate-900 text-md font-medium'>2.Lack of financial awareness</li>
                <li className='text-slate-900 text-md font-medium'>3.Manual budgeting challenges</li>
                <li className='text-slate-900 text-md font-medium'>4.No clear savings overview</li>
              </ul>
            </div>
          </div>
          <div className='flex flex-col gap-4 items-end justify-center'>
            <div className='flex items-center justify-center bg-slate-900 h-12 rounded-lg w-64'>
              <h3 className='text-lg text-slate-50 font-semibold'>Key Features</h3>
            </div>
            <div>
              <ul>
                <li className='text-slate-900 text-md font-medium'>1.Income and expense tracking</li>
                <li className='text-slate-900 text-md font-medium'>2.Budget management</li>
                <li className='text-slate-900 text-md font-medium'>3.Goal tracking and progess charts</li>
                <li className='text-slate-900 text-md font-medium'>4.Analytics dashboard</li>
                <li className='text-slate-900 text-md font-medium'>5.Smart financial insights</li>
              </ul>
            </div>
          </div>
        </div>
        </div>  
      </div>
  )
}

export default About