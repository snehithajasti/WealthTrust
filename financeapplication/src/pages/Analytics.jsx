import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {assets} from '../assets/assets.js';
import ExpenseChart from '../components/ExpenseChart.jsx';
import GoalsGraph from '../components/GoalsGraph.jsx';
import SmartInsights from '../components/SmartInsights.jsx';

const Analytics = () => {
  const {transactions} = useContext(AppContext);
  const {createdGoals} = useContext(AppContext);
  let income = 0;
  let expenses = 0;
  transactions.forEach((t)=>{
    const amount = Number(t.amount);
    if(t.type==="Expense"||t.type==="Goal"){
      expenses += amount;
    }
    if(t.type === "Income"){
      income += amount;
    }
  });
  const balance = income - expenses;

  const username = () =>{
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    return profile.name;
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-start justify-center gap-3 bg-slate-50 h-180 w-300 rounded-xl p-4'>
        <div className='flex flex-col items-start justify-center h-20 px-3'>
          <h2 className='text-emerald-900 text-3xl font-semibold mb-1'>Hi, {username()}! Welcome back.</h2>
          <p className='text-emerald-700 font-medium text-md '>This is your financial report</p>
        </div>
        <div className='flex border border-slate-900 rounded-lg h-144 w-full p-3'>
          <div className='flex flex-col items-center justify-center gap-4 h-full p-3 w-180'>
            <div className='flex items-center justify-center gap-2 border border-slate-900 border-2 h-48 rounded-lg p-3'>
              <div className='flex flex-col justify-center gap-2 py-3 px-2 w-54 bg-slate-200 h-full rounded-lg'>
                <div className='flex items-center justify-center border border-slate-900 border-2 px-2 h-12 w-full rounded-lg gap-2'>
                  <h2 className='text-lg font-semibold text-slate-900'>My balance</h2>
                  <img src={assets.balance} alt="" className='h-10'/>
                </div>
                <div className='flex items-center justify-center'>
                  <h1 className='text-black font-bold text-lg'>{balance}</h1>
                </div>
              </div>
              <div className='flex flex-col justify-center gap-2 py-3 px-2 w-54 bg-slate-200 h-full rounded-lg'>
                <div className='flex items-center justify-center border border-red-400 border-2 px-2 h-12 w-full rounded-lg gap-2'>
                  <h2 className='text-lg font-semibold text-red-400'>Monthly Spent</h2>
                  <img src={assets.spending} alt="" className='h-10'/>
                </div>
                <div className='flex items-center justify-center'>
                  <h1 className='text-black font-bold text-lg'>{expenses}</h1>
                </div>
              </div>
              <div className='flex flex-col justify-center gap-2 py-3 px-2 w-54 bg-slate-200 h-full rounded-lg'>
                <div className='flex items-center justify-center border border-green-500 border-2 px-2 h-12 w-full rounded-lg gap-2'>
                  <h2 className='text-lg font-semibold text-green-500'>Monthly Income</h2>
                  <img src={assets.income} alt="" className='h-9'/>
                </div>
                <div className='flex items-center justify-center'>
                  <h1 className='text-black font-bold text-lg'>{income}</h1>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='h-86 w-86 bg-slate-200 rounded-lg'>
                <div className='bg-slate-200 h-12 rounded-t-lg'>
                  <h2 className='flex items-center justify-center text-slate-900 text-md font-bold bg-slate-400 h-12 rounded-t-lg'>Goals Overview</h2>
                </div>
                <div className='flex items-center justify-center h-72 overflow-hidden'>
                  <GoalsGraph createdGoals={createdGoals} transactions={transactions} />
                </div>
              </div>
              <div className='flex flex-col h-86 w-86 bg-slate-200 rounded-lg'>
                <div className='bg-slate-200 h-12 rounded-t-lg'>
                  <h2 className='flex items-center justify-center text-slate-900 text-md font-bold bg-slate-400 h-12 rounded-t-lg'>Recent Transactions</h2>
                </div>
                <div className='flex flex-col gap-2 overflow-auto p-3'>
                  {
                    transactions.filter(transaction => transaction.type === "Expense").slice(0,5).map((transaction)=>(
                      <div key={transaction.id} className='flex items-center justify-between bg-slate-100 h-16 rounded-lg px-3'>
                        <div>
                          <h2 className='text-md font-semibold text-slate-900'>{transaction.description}</h2>
                          <p className='text-sm font-bold text-slate-900'>{transaction.date}</p>
                        </div>
                        <div>
                          <h2 className='text-md font-semibold'>{transaction.amount}</h2>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='flex items-center justify-center h-88 bg-slate-200 w-106 rounded-lg'>
              {transactions.length>0 ? 
                 <ExpenseChart/>
                 :
                 <div className='text-slate-900 font-semibold text-lg'>Add expenses to get overview</div>
              }
            </div>
            <div className='flex flex-col h-44 bg-slate-200 w-106 rounded-lg'>
              <h2 className='flex items-center justify-center h-12 bg-slate-900 text-lg font-medium text-slate-50 rounded-t-lg'>Smart Insights</h2>
              <div className='flex items-center justify-center h-32 p-2'>
                <SmartInsights />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics