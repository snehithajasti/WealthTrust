import { useContext } from 'react'
import { assets, expenseCategories, incomeCategories, paymentTypeCategories } from '../assets/assets';
import { useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


const Expensetracking = () => {
  const navigate = useNavigate()
  const currentmonth = new Date().toLocaleString('en-Us', { month: 'long', year: 'numeric' });
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
  const [type, setType] = useState("");
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [paymenttype, setPaymentType] = useState();
  const [date, setDate] = useState();
  const { transactions, setTransactions } = useContext(AppContext)
  const {bCategories,goalCategories} = useContext(AppContext)

  const currentDate = new Date();

  const currentMonthTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date);
    return (
      txDate.getMonth() === currentDate.getMonth() &&
      txDate.getFullYear() === currentDate.getFullYear()
    );
  });


  const income = transactions
    .filter(t => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "Expense" || t.type === "Goal")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income-expense;


  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();
    let finalType = type;
    if (goalCategories.includes(category)) {
      finalType = "Goal";
    }
    const newTransaction = {
      id,
      amount: Number(amount),
      category,
      description,
      paymenttype,
      date,
      type: finalType
    };

    setTransactions(prev => [...prev, newTransaction])
    setAmount('')
    setCategory('')
    setDescription('')
    setPaymentType('')
    setDate('')
    setType('')
  }

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id))
  }

  return (
    <div className='flex gap-3 bg-slate-700 min-h-screen ml-12 mr-12 w-auto rounded-xl p-4 justify-center items-center'>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-3 bg-slate-900 h-40 w-120 rounded-xl mb-3'>
          <div>
            <h1 className='text-slate-50 text-xl font-bold text-center mt-2'>Monthly Summary {currentmonth}</h1>
          </div>
          <div className='flex justify-center gap-4'>
            <div className='flex flex-col justify-start items-center bg-slate-50 rounded-xl h-25 w-40 bg-green-200'>
              <h3 className='text-slate-900 text-xl font-semibold bg-slate-400 rounded-t-xl w-full text-center h-10 py-1'>Total Inflow</h3>
              <div className='font-semibold text-lg bg-green-200 h-10 w-30 m-auto rounded-lg'>
                <p className='h-10 mt-1 text-slate-900 text-center py-1'>{income}</p>
              </div>
            </div>
            <div className='flex flex-col justify-start items-center bg-slate-50 rounded-xl h-25 w-40 bg-red-300'>
              <h3 className='text-slate-900 text-xl font-semibold bg-slate-400 rounded-t-xl w-full text-center h-10 py-1'>Total Outflow</h3>
              <div className='font-semibold text-lg bg-red-300 h-10 w-30 m-auto rounded-lg'>
                <p className='h-10 mt-1 text-slate-900 text-center py-1'>{expense}</p>
              </div>
            </div>
            <div></div>
          </div>

        </div>
        <div className='flex items-center justify-center w-full h-12 rounded-lg bg-slate-50 mb-3 p-3 gap-3'>
          <div className='flex items-center justify-center h-10 w-56 bg-slate-900 text-slate-50 font-medium text-lg rounded-lg'>Balance</div>
          <div className='flex items-center justify-center h-10 w-56 border border-slate-900 text-slate-900 font-medium text-xl rounded-lg'>{balance}</div>
        </div>
        <div className='flex'>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-2 bg-slate-50 rounded-xl w-120' action="">
            <div className='bg-slate-400  rounded-t-xl h-12'>
              <h2 className='text-slate-900 font-bold text-lg text-center mt-2'>Create Transaction</h2>
            </div>
            <div className='flex w-120 gap-1'>
              <select name="" id="" className='border border-slate-900 border-2 h-10 rounded-lg m-2 w-full' value={type} onChange={(e) => setType(e.target.value)} required>
                <option className='border border-slate-400 border-2 h-10  px-2' value="Income/Expense">Select Type</option>
                <option className='border border-slate-400 border-2 h-10 text-slate-900 px-2' value="Income">Income</option>
                <option className='border border-slate-400 border-2 h-10 text-slate-900 px-2' value="Expense">Expense</option>
                <option className='border border-slate-400 border-2 h-10 text-slate-900 px-2' value="Goal">Goal</option>
              </select>
            </div>
            <input className='border border-slate-400 border-2 text-slate-900 h-10 m-2 rounded-lg p-2 hover:border border-slate-900 border-1' type="number" placeholder='Enter Amount' min='0' value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <select name="" id="" className='border border-slate-400 border-2 h-10 m-2 rounded-lg p-2 hover:border border-slate-900 border-1' value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              {type === 'Expense' && bCategories.map((item, index) => (
                <option className='border border-slate-600 text-slate-900 border-1' key={index} value={capitalize(item)}>{capitalize(item)}</option>
              ))}
              {type === 'Income' && incomeCategories.map((item, index) => (
                <option className='border border-slate-600 text-slate-900 border-1' key={index} value={capitalize(item)}>{capitalize(item)}</option>
              ))}
              {type === 'Goal' && goalCategories.map((item, index) => (
                <option className='border border-slate-600 text-slate-900 border-1' key={index} value={capitalize(item)}>{capitalize(item)}</option>
              ))}
            </select>
            <input className='border border-slate-400 border-2 text-slate-900 h-10 m-2 rounded-lg p-2 hover:border border-slate-900 border-1' type="text" placeholder='Add Description' value={description} onChange={(e) => setDescription(capitalize(e.target.value))} maxLength="20" required />
            {type === 'Expense' && (
              <select name="" id="" className='border border-slate-400 border-2 h-10 m-2 rounded-lg p-2 hover:border border-slate-900 border-1' value={paymenttype} onChange={(e) => setPaymentType(e.target.value)} required>
                <option value="">Select Payment Type</option>
                {paymentTypeCategories.map((item, index) => (
                  <option key={index} value={capitalize(item)}>{capitalize(item)}</option>
                ))}
              </select>
            )}
            <input className='border border-slate-400 border-2 h-10 m-2 rounded-lg p-2 hover:border border-slate-900 border-1' type="date" placeholder='Select Date' value={date} onChange={(e) => setDate(e.target.value)} required />
            <button type='submit' className='bg-blue-300 m-2 text-slate-900 text-center rounded-lg h-10'>Add Transaction</button>
          </form>
        </div>
      </div>

      <div className=' flex flex-col bg-slate-400 border-slate-50 overflow-auto h-171 w-200 rounded-xl'>
        <h1 className='bg-slate-900 text-slate-50 text-center rounded-t-xl h-12 p-3 font-semibold text-xl mb-1'>Transaction History</h1>
        {transactions && transactions.length !== 0 ? (
          <div className='flex flex-col'>
            <div className='flex justify-between m-2 bg-slate-900 text-slate-50 font-semibold rounded-lg px-2 py-3'>
              <p>Decription</p>
              <p>Date</p>
              <p>Category</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            {transactions.map((item, index) => (
              <div>
                <div className='flex mb-2'>
                  <div className='flex flex-col bg-slate-50 p-2 rounded-xl m-auto justify-center items-center'>
                    <div className='flex justify-between px-2 py-3 h-12 border border-slate-900 border-1 rounded-lg mx-3 w-140 mb-2'>
                      <p className='text-slate-900 text-md font-bold'>{item.description}</p>
                      <p className='text-slate-900 text-md font-bold'>{item.date}</p>
                      <p className='text-slate-900 text-md font-bold'>{item.category}</p>
                      <p className='text-slate-900 text-md font-bold'>{item.amount}</p>
                      <p className='text-slate-900 text-md font-bold'>{item.type}</p>
                    </div>
                    <div className='flex justify-end gap-1'>
                      <button onClick={() => navigate(`/transactions/${item.id}`)} className='bg-green-200 text-slate-900 rounded-lg px-2 py-3 w-25 text-center'>Edit</button>
                      <button onClick={() => deleteTransaction(item.id)} className='bg-red-200 text-slate-900 rounded-lg px-2 py-3 w-25 text-center'>Delete</button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex justify-center items-center h-632'>
            <p>No Transactions Found!</p>
          </div>

        )
        }

      </div>
    </div>
  )
}

export default Expensetracking