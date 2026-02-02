import React, { useState, useEffect } from 'react'
import assets from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'


const Goalsandbudgets = () => {
  const { transactions } = useContext(AppContext)
  const currentmonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)


  const [categoryPopUp, setCategoryPopUp] = useState(false)
  const [budget, setBudget] = useState('')
  const [budgetedcategories, setBudgetedCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [createCategoryPopUp, setCreateCategoryPopUp] = useState(false)
  const [goalPopUp, setGoalPopUp] = useState(false)
  const { createdGoals, setCreatedGoals } = useContext(AppContext)
  const [selectedGoalCategory, setSelectedGoalCategory] = useState('')
  const [selectedGoalItem, setSelectedGoalItem] = useState(null)
  const [goalAmount, setGoalAmount] = useState('')
  const [goalDate, setGoalDate] = useState('')
  const [createGoalPopUp, setCreateGoalPopUp] = useState(false)
  const [newGoal, setNewGoal] = useState('')
  const [editBudgetPopUp, setEditBudgetPopUp] = useState(false)
  const [editGoalPopUp, setEditGoalPopUp] = useState(false)
  const [editBudgetCategoryName, setEditBudgetCategoryName] = useState('')
  const [editLimit, setEditLimit] = useState('')
  const [editGoalCategoryName, setEditGoalCategoryName] = useState('')
  const [editGoalAmount, setEditGoalAmount] = useState('')
  const [editGoalDate, setEditGoalDate] = useState('')
  const { bCategories, setBCategories } = useContext(AppContext);
  const { goalCategories, setGoalCategories } = useContext(AppContext);


  useEffect(() => {
    localStorage.setItem(
      "budgetedcategories",
      JSON.stringify(budgetedcategories)
    );
  }, [budgetedcategories]);


  const budgetProgress = () => {
    return budgetedcategories.map(item =>
      Math.min((item.spent / item.limit) * 100, 100)
    );
  }

  const progressValues = budgetProgress();

  const spentAmount = () => {
    return transactions.reduce((total, item) => {
      if (
        item.type === "Expense" &&
        item.category === selectedCategory
      ) {
        return total + Number(item.amount);
      }
      return total;
    }, 0);
  };


  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    const exists = budgetedcategories.some((item) => item.category === selectedCategory);
    if (exists) {
      alert(`${selectedCategory} exists`);
      setCategoryPopUp(false);
      setBudget('')
      return;
    }
    const newBudget = {
      id: budgetedcategories.length + 1,
      category: selectedCategory,
      spent: spentAmount(),
      limit: Number(budget)
    }
    setBudgetedCategories((prev) => [...prev, newBudget])
    setCategoryPopUp(false)
    setBudget('')
    setSelectedCategory('')
  }

  const addCategory = (e) => {
    e.preventDefault();
    const exists = bCategories.some(
      cat => cat.toLowerCase() === newCategory.toLowerCase()
    )

    if (exists) {
      alert('Category already exists')
    } else {
      setBCategories((prev) => [...prev, capitalize(newCategory)])


    }
    setNewCategory('')
    setCreateCategoryPopUp(false)
  }

 const handleGoalSubmit = (e) => {
  e.preventDefault();

  const normalizedCategory = capitalize(selectedGoalCategory.trim());

  const exists = createdGoals.some(
    item => item.category.toLowerCase() === normalizedCategory.toLowerCase()
  );

  if (exists) {
    alert(`${normalizedCategory} already exists`);
    setGoalAmount('');
    setGoalDate('');
    setGoalPopUp(false);
    return;
  }

  const newGoal = {
    id: Date.now(),
    category: normalizedCategory,
    goal: Number(goalAmount),
    targetDate: goalDate
  };

  setCreatedGoals(prev => [...prev, newGoal]);

  if (!goalCategories.some(
    c => c.toLowerCase() === normalizedCategory.toLowerCase()
  )) {
    setGoalCategories(prev => [...prev, normalizedCategory]);
  }

  setGoalAmount('');
  setSelectedGoalCategory('');
  setGoalDate('');
  setGoalPopUp(false);
};


  const addGoal = (e) => {
    e.preventDefault();
    const exists = goalCategories.some(
      cat => cat.toLowerCase() === newGoal.toLowerCase()
    )
    if (exists) {
      alert(`Category Already exists`)
    } else {
      setGoalCategories((prev) => [...prev, capitalize(newGoal)])
    }
    setNewGoal('')
    setCreateGoalPopUp(false)
  }

  const deleteBudgetItem = (indexToDelete) => {
    const categoryName = bCategories[indexToDelete];
    setBCategories(prev =>
      prev.filter((_, index) => index !== indexToDelete)
    );
    setBudgetedCategories(prev =>
      prev.filter(b => b.category !== categoryName)
    );
  };

  const deleteGoalItem = (indexToDelete) => {
    const goalName = goalCategories[indexToDelete];
    setGoalCategories(prev =>
      prev.filter((_, index) => index !== indexToDelete)
    );
    setCreatedGoals(prev =>
      prev.filter(g => g.category !== goalName)
    );
  };

  const deleteBudgetedItem = (indexToDelete) => {
    setBudgetedCategories((prev) => prev.filter((item, index) => index !== indexToDelete))
  }

  const deleteGoalCreatedItem = (indexToDelete) => {
    setCreatedGoals((prev) => prev.filter((item, index) => index !== indexToDelete))
  }

  const editBCategory = (e) => {
    e.preventDefault();
    setBudgetedCategories((prev) => prev.map((item) => (
      item.id === selectedCategory.id ? {
        ...item,
        category: capitalize(editBudgetCategoryName),
        limit: editLimit
      } : item
    ))),
      setEditBudgetCategoryName('')
    setEditLimit('')
    setEditBudgetPopUp(false)

  }

  const editGCategory = (e) => {
    e.preventDefault();
    setCreatedGoals((prev) => prev.map((item) => (
      item.id === selectedGoalItem.id ? {
        ...item,
        category: capitalize(editGoalCategoryName),
        goal: editGoalAmount,
        targetDate: editGoalDate
      } : item
    ))),
      setEditGoalCategoryName('')
    setEditGoalAmount('')
    setEditGoalDate('')
    setEditGoalPopUp(false)
  }

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    setBudgetedCategories((prevBudgets) =>
      prevBudgets.map((budget) => {
        const spent = transactions.reduce((total, tx) => {
          if (
            tx.type === "Expense" &&
            tx.category === budget.category
          ) {
            return total + Number(tx.amount);
          }
          return total;
        }, 0);

        return {
          ...budget,
          spent
        };
      })
    );
  }, [transactions]);

  const goalSavedAmount = (goalCategory) => {
    return transactions.reduce((total, tx) => {
      if (
        tx.type === "Goal" &&
        tx.category === goalCategory
      ) {
        return total + Number(tx.amount);
      }
      return total;
    }, 0);
  };

  const goalProgress = (goal) => {
    const saved = goalSavedAmount(goal.category);
    const target = Number(goal.goal);

    if (!target || target === 0) return 0;

    return Math.min((saved / target) * 100, 100);
  };

  useEffect(() => {
    const saved = localStorage.getItem("budgetedcategories");
    if (saved) {
      setBudgetedCategories(JSON.parse(saved));
    }
  }, [])

  console.log(goalCategories)
  return (
    <div className='flex flex-col'>
      {categoryPopUp && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='absolute inset-0 bg-slate-50/80' onClick={() => setCategoryPopUp(false)} />
          <div className='flex flex-col gap-12 bg-slate-600 m-6 h-100 w-100 relative rounded-xl p-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl font-semibold text-slate-50'>Set Budgets</h2>
              <img src={assets.closemark} className='w-8' onClick={() => setCategoryPopUp(false)} alt="" />
            </div>

            <div className='border border-slate-900 p-2 bg-slate-50 h-10 rounded-lg'>{selectedCategory}</div>
            <form className='flex flex-col gap-3' onSubmit={handleBudgetSubmit} action="">
              <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className='border border-slate-900 p-2 bg-slate-50 h-10 rounded-lg' name="" id="" placeholder='Set Budget' required />
              <button type='submit' className='border border-slate-50 bg-blue-300 text-center p-2 rounded-lg' >Save</button>
            </form>
          </div>
        </div>
      )}
      {createCategoryPopUp && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='absolute inset-0 bg-slate-50/80' onClick={() => setCreateCategoryPopUp(false)} />
          <div className='flex flex-col items-center gap-6 h-80 w-80 bg-slate-600 relative rounded-xl'>
            <div className='flex  justify-between items-center bg-slate-300 h-16 w-70 rounded-lg mt-12 p-2'>
              <h2 className='text-slate-900 text-lg font-semibold'>Create Category</h2>
              <img onClick={() => setCreateCategoryPopUp(false)} className='w-10' src={assets.closemark} alt="" />
            </div>
            <form action="" onSubmit={addCategory} className='flex flex-col gap-6'>
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className='bg-slate-50 h-10 w-60 rounded-lg p-3 text-slate-900' name="" id="" placeholder='Enter Category' />
              <button className='h-10 w-60 rounded-xl bg-blue-300' type='submit'>Save</button>
            </form>

          </div>

        </div>
      )}
      {
        goalPopUp && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='absolute inset-0 bg-slate-50/80' onClick={() => setGoalPopUp(false)} />
            <div className='relative flex flex-col items-center bg-slate-700 h-100 w-100 rounded-xl gap-6'>
              <div className='flex justify-between items-center h-15 w-85 bg-slate-400 rounded-lg p-3 mt-6'>
                <h2 className='text-xl font-semibold text-slate-50'>Create Goal</h2>
                <img className='w-10' onClick={() => setGoalPopUp(false)} src={assets.closemark} alt="" />
              </div>
              <div className='flex flex-col items-center justify-center gap-2 h-60 w-85 border border-slate-50 border-2 rounded-lg'>
                <div className='flex items-center bg-slate-50 h-10 w-80 text-md text-slate-900 rounded-lg p-2'>{selectedGoalCategory}</div>
                <form action="" className='flex flex-col gap-2' onSubmit={handleGoalSubmit}>
                  <input className='bg-slate-50 h-10 w-80 text-md text-slate-900 rounded-lg p-2' type="number" name="" id="" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} placeholder='Enter Goal Amount' required />
                  <input className='bg-slate-50 h-10 w-80 text-md text-slate-900 rounded-lg p-2' type="date" placeholder='Enter Target Date' value={goalDate} onChange={(e) => setGoalDate(e.target.value)} required />
                  <button className='bg-blue-300 text-slate-50 text-md font-semibold rounded-lg h-10 mt-4' type='submit'>Save</button>
                </form>
              </div>
            </div>
          </div>
        )
      }
      {createGoalPopUp && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='absolute inset-0 bg-slate-50/80' onClick={() => setCreateGoalPopUp(false)} />
          <div className='relative flex flex-col items-center gap-8 h-80 w-80 rounded-xl bg-slate-700 p-6'>
            <div className='flex items-center justify-between bg-slate-400 h-16 w-70 rounded-lg p-2'>
              <h2 className='text-lg font-semibold'>Customize Goal</h2>
              <img className='w-10' src={assets.closemark} alt="" onClick={() => setCreateGoalPopUp(false)} />
            </div>
            <div className='flex items-center justify-center h-10 w-60 border border-slate-50 border-2 rounded-xl h-42 w-66 py-6'>
              <form action="" className='flex flex-col gap-3' onSubmit={addGoal}>
                <input className='bg-slate-50 text-slate-900 text-md rounded-lg h-10 w-60 p-2' value={newGoal} onChange={(e) => setNewGoal(e.target.value)} type="text" placeholder='Create Your Goal' />
                <button className='bg-blue-300 rounded-lg h-10 text-slate-50 w-60' type='submit'>Save</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {editBudgetPopUp && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='absolute inset-0 bg-slate-50/80' onClick={() => setEditBudgetPopUp(false)} />
          <div className='relative flex flex-col gap-5 items-center justify-center rounded-xl bg-slate-700 h-100 w-120 p-4'>
            <h2 className='border border-slate-50 border-2 text-slate-50 font-semibold text-center rounded-lg w-full py-2 text-lg'>Edit Budget</h2>
            <h2 className='flex items-center bg-slate-50 text-md font-semibold text-slate-900 h-10 roumded-lg w-full p-2 rounded-lg'>{selectedCategory.category}</h2>
            <form action="" onSubmit={editBCategory} className='flex flex-col border border-slate-50 border-2 rounded-xl h-50 w-100 items-center justify-center p-3 gap-2'>
              <input className='bg-slate-50 text-sm text-slate-900 h-10 rounded-lg w-full p-2' type="text" placeholder='Edit Category Name' value={editBudgetCategoryName} onChange={(e) => setEditBudgetCategoryName(e.target.value)} />
              <input className='bg-slate-50 text-sm text-slate-900 h-10 rounded-lg w-full p-2' type="number" placeholder='Edit Limit' value={editLimit} onChange={(e) => setEditLimit(e.target.value)} />
              <button className='bg-blue-300 text-slate-50 font-semibold h-10 w-full rounded-lg' type='submit'>Save</button>
            </form>
          </div>
        </div>
      )}
      {editGoalPopUp && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='absolute inset-0 bg-slate-50/80' onClick={() => setEditGoalPopUp(false)} />
          <div className='relative flex flex-col gap-5 rounded-xl bg-slate-700 h-100 w-120 items-center justify-center p-4'>
            <h2 className='border border-slate-50 border-2 rounded-lg py-2 w-full text-slate-50 text-center'>Edit Goal</h2>
            <h2 className='flex items-center bg-slate-50 h-10 text-slate-900 rounded-lg w-full p-2'>{selectedGoalItem?.category}</h2>
            <form action="" onSubmit={editGCategory} className='flex flex-col gap-2 border border-slate-50 border-2 h-50 w-100 rounded-lg p-3 items-center justify-center'>
              <input type="text" placeholder='Edit Category Name' className='bg-slate-50 h-10 rounded-lg text-slate-900 p-2 w-full' value={editGoalCategoryName} onChange={(e) => setEditGoalCategoryName(e.target.value)} />
              <input type="date" placeholder='Edit Date' className='bg-slate-50 h-10 rounded-lg text-slate-900 p-2 w-full' value={editGoalDate} onChange={(e) => setEditGoalDate(e.target.value)} />
              <input type="number" placeholder='Edit Goal Amount' className='bg-slate-50 h-10 rounded-lg text-slate-900 p-2 w-full' value={editGoalAmount} onChange={(e) => setEditGoalAmount(e.target.value)} />
              <button type='submit' className='bg-blue-300 text-slate-50 text-md font-semibold text-center h-10 rounded-lg w-full'>Save</button>
            </form>
          </div>
        </div>
      )}
      <div className='flex gap-3 justify-center items-center mb-10'>
        <div className='flex flex-col bg-slate-200 w-150 h-160 p-3 rounded-xl gap-3'>
          <div className='flex flex-col bg-slate-700 h-25 rounded-lg items-center border border-slate-900 border-1'>
            <h2 className='bg-slate-50 w-full text-slate-900 font-bold text-xl rounded-t-lg text-center h-10 py-2'>Create Budgets</h2>
            <p className='text-sm font-medium text-slate-50 text-center mt-2'>Start with Budgets to have an efficient <br /> overview of your spending limits</p>
          </div>
          {bCategories.length === 0 ? (
            <div className='flex flex-col gap-2 bg-slate-300 h-120 rounded-xl justify-center items-center overflow-auto pt-8 pb-8'>
              <p className='text-slate-900 text-md font-semibold'>Start by adding categories</p>
            </div>
          ) : (
            <div className='flex flex-col gap-2 bg-slate-50 h-120 rounded-xl justify-start items-center overflow-auto pt-8 pb-8'>
              {bCategories.map((item, index) => (
                <div key={index} className='flex p-3 justify-between w-130 bg-slate-400 rounded-lg h-15 items-center'>
                  <h2 className='text-slate-900 font-semibold text-lg'>{item}</h2>
                  <div className='flex items-center justify-between gap-3'>
                    <button onClick={() => { setSelectedCategory(item); setCategoryPopUp(true) }} className='bg-slate-50 text-slate-900 font-semibold px-3 py-2 rounded-lg hover:bg-slate-200'>Set Budget</button>
                    <img onClick={() => deleteBudgetItem(index)} className='w-10' src={assets.trash} alt="" />
                  </div>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => setCreateCategoryPopUp(true)} className='bg-slate-400 text-slate-900 text-center h-12 rounded-lg font-semibold text-lg hover:bg-slate-500'>Customize Budget</button>
        </div>
        <div className='flex flex-col bg-slate-600 w-150 h-160 p-3 rounded-xl justify-center'>
          <div className='flex items-center justify-center bg-slate-900 rounded-xl h-15 mb-3'>
            <h2 className='text-slate-50 text-xl font-semibold'>Budgeted Categories : {currentmonth}</h2>
          </div>
          <div className='flex flex-col'>
            {
              budgetedcategories && budgetedcategories.length !== 0 ? (
                <div className='flex flex-col bg-slate-300 rounded-xl h-125 gap-2 py-4 overflow-auto'>
                  {budgetedcategories.map((item, index) => {
                    const progress = progressValues[index];
                    return (
                      <div key={index} className='flex bg-slate-500 rounded-lg border border-slate-900 border-1 justify-between items-center px-3 py-1 ml-2 mr-2'>
                        <h2 className='text-slate-50 text-lg font-semibold'>{item.category}</h2>
                        <div className='flex items-center justify-between gap-4'>
                          <div>
                            <div className='flex flex-col gap-1'>
                              <small className='text-sm font-semibold text-start'>Spent:{item.spent}</small>
                              <div className='bg-slate-50 h-2 w-40 rounded-full overflow-hidden'>
                                <div className={`h-2 rounded-full ${progress < 50 ? 'bg-green-300' : progress < 80 ? 'bg-yellow-300' : 'bg-red-400'}`} style={{ width: `${progress}%`, transition: 'width 0.4s ease' }}></div>
                              </div>
                              <small className='text-sm font-semibold text-end'>Limit:{item.limit}</small>
                            </div>
                          </div>
                          <div className='flex flex-col'>
                            <button onClick={() => { setSelectedCategory(item); setEditBudgetPopUp(true) }} className='w-18 border bg-green-200 border-slate-50 border-2 text-center text-sm font-semibold rounded-lg mb-1 text-slate-900'>Edit</button>
                            <button onClick={() => deleteBudgetedItem(index)} className='w-18 border bg-red-200 border-slate-50 border-2 text-center text-sm font-semibold rounded-lg text-slate-900'>Delete</button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
                : (
                  <div className='flex justify-center items-center h-125 rounded-xl bg-slate-500'>
                    <p className='text-md text-slate-50 font-semibold'>Budget list is empty</p>
                  </div>
                )
            }
          </div>
        </div>
      </div>
      <div className='flex gap-2 bg-slate-500 m-6 rounded-xl h-180 items-center justify-center '>
        <div className='flex flex-col bg-slate-900 h-170 w-150 rounded-xl gap-3'>
          <div className='flex flex-col items-center bg-slate-100 rounded-xl h-25 mx-3 mt-3'>
            <h2 className='flex justify-center items-center bg-slate-500 w-full text-slate-900 font-bold text-xl rounded-t-xl h-10 text-center'>Create Goals</h2>
            <p className='flex items-center justify-center h-15 text-slate-900 text-sm font-medium'>Set your goals and have a quick overview of your progress</p>
          </div>
          {goalCategories.length === 0 ? (
            <div className='flex flex-col justify-center items-center bg-slate-400 h-120 rounded-xl mx-3 gap-3 overflow-auto'>
              <p className='text-md text-slate-50 font-semibold'>Start by adding Categories</p>
            </div>
          ) : (
            <div className='flex flex-col justify-start bg-slate-400 h-120 rounded-xl mx-3 gap-3 overflow-auto py-8'>
              {goalCategories.map((item, index) => (
                <div key={index} className='flex items-center justify-between bg-slate-900 h-15 mx-3 rounded-xl p-3'>
                  <h2 className='text-lg text-slate-50 font-semibold'>{item}</h2>
                  <div className='flex items-center justify-between gap-3'>
                    <button onClick={() => { setSelectedGoalCategory(item); setGoalPopUp(true) }} className='bg-slate-50 text-slate-900 font-semibold text-md px-2 py-2 rounded-lg'>Create Goal</button>
                    <img onClick={() => deleteGoalItem(index)} className='w-10' src={assets.trash} alt="" />
                  </div>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => setCreateGoalPopUp(true)} className='bg-slate-100 text-slate-900 rounded-xl font-semibold text-xl mx-3 h-12'>Customize Goal</button>
        </div>
        <div className='flex flex-col bg-slate-50 h-170 w-150 rounded-xl gap-3 justify-center '>
          <div className='bg-slate-600 flex items-center justify-center h-15 rounded-xl mx-3 mt-3'>
            <h2 className='text-slate-50 text-xl font-semibold'>Goals Overview</h2>
          </div>
          <div className='flex flex-col bg-slate-300 rounded-xl mx-3 h-125 py-3'>
            {createdGoals.length !== 0 ? (
              <div className='flex flex-col gap-2 overflow-auto'>
                {createdGoals.map((item, index) => (
                  <div className='flex justify-between items-center bg-slate-700 p-3 rounded-lg mx-3' key={index}>
                    <div className='flex flex-col justify-center items-start'>
                      <h2 className='text-lg font-semibold text-slate-50'>{item.category}</h2>
                      <small className='text-sm text-slate-50'>{(new Date(item.targetDate)).toLocaleDateString()}</small>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                      <div>
                        <div className='flex flex-col gap-1'>
                          <small className='text-sm font-semibold text-slate-50 text-start'>Amount Saved : {goalSavedAmount(item.category)}</small>
                          <div className='bg-slate-50 h-2 w-40 rounded-full overflow-hidden'>
                            <div className='h-2 bg-green-400 rounded-full transition-all duration-500' style={{ width: `${goalProgress(item)}%` }}></div>
                          </div>
                          <small className='text-sm text-slate-50 font-semibold text-end'>Goal Target : {item.goal}</small>
                        </div>
                      </div>
                      <div className='flex flex-col '>
                        <button onClick={() => { setSelectedGoalItem(item); setEditGoalPopUp(true) }} className='w-18 border bg-green-200 border-slate-50 border-2 text-center text-sm font-semibold rounded-lg mb-1 text-slate-900'>Edit</button>
                        <button onClick={() => deleteGoalCreatedItem(index)} className='w-18 border bg-red-200 border-slate-50 border-2 text-center text-sm font-semibold rounded-lg text-slate-900'>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex justify-center items-center h-full'>
                <p className='text-slate-900 text-lg font-medium'>No goals yet - let's add one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Goalsandbudgets