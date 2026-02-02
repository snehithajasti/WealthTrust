import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList
} from "recharts";

const GoalsGraph = ({createdGoals,transactions}) => {

    if(!createdGoals || createdGoals.length===0){
        return <p>No goals available</p>;
    }

    const data = createdGoals.map((goal)=>{
        const saved = transactions.reduce((total,tx)=>{
            if(
                tx.type==="Goal" &&
                tx.category===goal.category
            ){
                return total+Number(tx.amount);
            }
            return total;
        },0);
        const percentage = Math.min(
            Math.round((saved/goal.goal)*100),
            100
        );

        return{
            name:goal.category,
            progress:percentage
        };
    });

  return (
    <div className='w-full h-full'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis domain={[0,100]} tickFormatter={(v)=>`${v}%`} />
                <Tooltip formatter={(v)=>`${v}%`} />
                <Bar dataKey="progress" radius={[6,6,0,0]}>
                    <LabelList 
                       dataKey="progress"
                       position="top"
                       formatter={(v)=>`${v}%`}
                    />   
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default GoalsGraph