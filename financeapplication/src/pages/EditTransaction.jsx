import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { incomeCategories,paymentTypeCategories } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const EditTransaction = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const numericId = Number(id)
    
    const { transactions, setTransactions } = useContext(AppContext)
    const {bCategories,goalCategories} = useContext(AppContext)
    
    const transaction = transactions.find(t => t.id === numericId);

    useEffect(()=>{
        if(!transaction){
            navigate('/expensetracking')
        }
    },[transaction,navigate])

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

    const [editAmount, setEditAmount] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editPaymentType, setEditPaymentType] = useState('');
    const [editDate, setEditDate] = useState('')

    useEffect(()=>{
        if(transaction){
            setEditAmount(transaction.amount)
      setEditCategory(transaction.category)
      setEditDescription(transaction.description)
      setEditPaymentType(transaction.paymenttype)
      setEditDate(transaction.date)
        }
    },[transaction])

    const handleEditTransaction = (e) => {
        e.preventDefault();
        const EdittedTransaction = {
            ...transaction,
            amount: Number(editAmount),
            category: editCategory,
            description: editDescription,
            paymenttype: editPaymentType,
            date: editDate,
        };
        setTransactions((prev) => prev.map((tsxn) => tsxn.id.toString() === id ? EdittedTransaction : tsxn))
        navigate('/expensetracking')
    }

    const getCategoryOptions = () => {
        if(!transaction) return[];
        if(transaction.type === "Income"){
            return incomeCategories.map(c =>capitalize(c));
        }
        if(transaction.type==="Expense"){
            return bCategories;
        }
        if(transaction.type==="Goal"){
            return goalCategories;
        }
        return [];
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col bg-slate-50 h-100 w-120 rounded-xl'>
                <h1 className='bg-slate-900 text-slate-50 text-bold rounded-t-xl mb-3 text-center font-semibold text-lg p-2'>Edit Transaction</h1>
                <form action="" onSubmit={handleEditTransaction} className='flex flex-col p-3 gap-2 items-center'>
                    <input className='bg-slate-50 text-slate-900 border border-blue-300 border-1 h-10 w-100 rounded-lg px-2' type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
                    <select name="" id="" className='bg-slate-50 text-slate-900 border border-blue-300 border-1 h-10 w-100 rounded-lg px-2 py-2' value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {getCategoryOptions().map((item, index) => (
                            <option key={index} value={capitalize(item)}>{capitalize(item)}</option>
                        ))}
                    </select>
                    <input className='bg-slate-50 text-slate-900 border border-blue-300 border-1 h-10 w-100 rounded-lg px-2' type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                    <input className='bg-slate-50 text-slate-900 border border-blue-300 border-1 h-10 w-100 rounded-lg px-2' type="text" value={editPaymentType} onChange={(e) => setEditPaymentType(e.target.value)} />
                    <input className='bg-slate-50 text-slate-900 border border-blue-300 border-1 h-10 w-100 rounded-lg px-2 mb-4' type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
                    <button className='bg-blue-300 text-slate-900 font-semibold text-md px-3 py-2 rounded-lg' type='submit'>Save</button>
                </form>

            </div>
        </div>
    )
}

export default EditTransaction