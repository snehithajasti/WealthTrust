import {createContext, useState, useEffect, use} from 'react';
import { budgetCategories,goalCreationCategories } from '../assets/assets';

export const AppContext = createContext()

const AppContextProvider = ({children}) => {
  const [transactions,setTransactions] = useState(()=>{
    const stored = localStorage.getItem("transactions");
    return stored?JSON.parse(stored):[];
  });

  useEffect(()=>{
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  },[transactions]);

  const [createdGoals,setCreatedGoals] = useState(()=>{
    const saved = localStorage.getItem("createdGoals");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(()=>{
    localStorage.setItem("createdGoals",JSON.stringify(createdGoals));
  },[createdGoals]);

  const [bCategories,setBCategories] = useState(()=>{
    const saved = localStorage.getItem("budgetCategories");
    return saved? JSON.parse(saved) : budgetCategories
  });

  useEffect(()=>{
    localStorage.setItem(
      "budgetCategories",
      JSON.stringify(bCategories)
    );
  },[bCategories]);

  const [goalCategories,setGoalCategories] = useState(()=>{
    const saved = localStorage.getItem("goalCreationCategories");
    return saved ? JSON.parse(saved) : goalCreationCategories
  });

  useEffect(()=>{
    localStorage.setItem(
      "goalCreationCategories",
      JSON.stringify(goalCategories)
    )
  },[goalCategories]);

  return (
    <AppContext.Provider value={{transactions,setTransactions,createdGoals,setCreatedGoals,bCategories,setBCategories,goalCategories,setGoalCategories}}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider