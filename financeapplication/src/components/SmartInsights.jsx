import React from 'react'
import { useContext } from 'react'
import {AppContext} from '../context/AppContext';

const SmartInsights = () => {
    const {transactions} = useContext(AppContext);
    const {createdGoals} = useContext(AppContext);
    
    if(!transactions||transactions.length===0){
        return <p className='text-lg font-light text-slate-900 text-center'>No insights available yet</p>;
    }

    let income = 0;
    let expense = 0;

    transactions.forEach((tx)=>{
        const amount = Number(tx.amount);
        if(tx.type === 'Income') income+=amount;
        if(tx.type === 'Expense' || tx.type === 'Goal') expense+=amount;
    });

    const savings = income-expense;
    const categoryMap = {};

    transactions.forEach((tx)=>{
        if(tx.type === 'Expense'){
            categoryMap[tx.category] = (categoryMap[tx.category] || 0) + Number(tx.amount);
        }
    });

    const highestCategory = Object.keys(categoryMap).length ? Object.entries(categoryMap).sort((a,b)=>b[1]-a[1])[0] : null;

    const goalInsights = createdGoals.map((goal)=>{
        const saved = transactions.reduce((total,tx)=>{
            if(tx.type === 'Goal' && tx.category === goal.category){
                return total + Number(tx.amount);
            }
            return total;
        },0);
        const percent = Math.min(
            Math.round((saved/goal.goal)*100),
            100
        );
        return {
            name:goal.category,
            percent
        };
    });

  return (
    <div>
        {savings >=0 ? (
            <p className='text-lg font-semibold text-slate-900 text-center'>You saved {savings} this month.</p>
        ) : (
            <p className='text-lg font-semibold text-slate-900 text-center'>You spent {Math.abs(savings)} more than your income.</p>
        )}

        {
            highestCategory && (
                <p className='text-md font-semibold text-slate-900 text-center'>
                    Highest spending : {highestCategory[0]} ({highestCategory[1]})
                </p>
            )
        }

        {goalInsights.map((goal,index)=>(
            <p key={index} className='text-lg font-semibold text-slate-900 text-center'>
                {goal.name} goal is {goal.percent}% complete
            </p>
        ))}
    </div>
  )
}

export default SmartInsights