import {PieChart,Pie,Tooltip,Legend, Cell} from "recharts";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {CATEGORY_COLORS} from '../assets/assets.js'

const ExpenseChart = () => {
    const {transactions} = useContext(AppContext);
    const expenses = transactions.filter(t => t.type ==="Expense");

    const categoryTotals = expenses.reduce((acc,curr)=>{
        const amount = Number(curr.amount);
    acc[curr.category] = (acc[curr.category]||0) + curr.amount;
    return acc;
  },{});

  const total = Object.values(categoryTotals).reduce(
    (a,b) => a+Number(b),
    0
  );

  const data = Object.entries(categoryTotals).map(
    ([category,amount]) => ({
        name:category,
        value:Number(((amount/total)*100).toFixed(1))
    })
  );
  return(
    <PieChart width={300} height={300}>
        <Pie 
           data={data}
           dataKey="value"
           nameKey="name"
           outerRadius={100}
           label
        >

        {data.map((entry,index)=>(
            <Cell 
               key={index}
               fill={CATEGORY_COLORS[entry.name?.trim()]|| "#CBD5E1"}
            />
        ))}
        </Pie>
        <Tooltip/>
        <Legend/>
        </PieChart>
  );
};

export default ExpenseChart;