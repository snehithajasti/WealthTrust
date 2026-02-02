import React, { useState } from 'react'
import { searchStocks } from '../services/finnhub.js';

export const StockSearch = ({setActiveAsset}) => {
  const [query,setQuery] = useState('');
  const [results,setResults] = useState([]);
  const [loading,setLoading] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if(value.length<2){
        setResults([]);
        return;
    }
    setLoading(true);
    try{
      const data = await searchStocks(value);
      console.log("Finnhub search response :",data)
      setResults(data.result.slice(0,6));
    }catch(err){
      console.error("Search failed",err)
    }finally{
      setLoading(false)
    }
  };

  const handleSelect = (stock)=>{
    setActiveAsset({
        name:stock.description,
        symbol:stock.symbol,
        market:"US",
        type:"STOCK"
    });
    setQuery("");
    setResults([]);
  }

  return (
    <div className='relative w-full'>
        <input value={query} onChange={handleSearch} type="text" placeholder='Search for Stocks' className='bg-slate-50 h-12 border border-slate-900 text-slate-900 w-full rounded-lg px-2 hover:bg-slate-100'/>
        {loading && <p className='font-bold text-md text-slate-50'>Searching...</p> }
        {results.length>0 && (
            <div className='absolute flex flex-col gap-1 bg-slate-50 w-full rounded-lg max-h-60 overflow-auto z-10 p-3'>
                {results.map((item,index)=>(
                    <div key={item.symbol} onClick={()=>handleSelect(item)} className='flex flex-col w-full rounded-lg bg-slate-200 border border-slate-900 px-2'>
                      <p>{item.description}</p>
                      <small>{item.symbol}</small>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}