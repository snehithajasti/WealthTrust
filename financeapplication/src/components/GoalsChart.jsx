import React from "react";
import { PieChart, Pie, Tooltip, Legend } from "recharts";


const GoalsChart = ({ goals }) => {

    const goalsGraphData = goals.map((goal) => ({
        name: goal.category,
        value: Number(goal.goal),
    }));

    if (goalsGraphData.length === 0) {
        return <p className="text-center mt-6">No goals to display</p>;
    }

    return (
        <div>
            <PieChart width={330} height={280}>
                <Pie
                    data={goalsGraphData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                />
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default GoalsChart;
